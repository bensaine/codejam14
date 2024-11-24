
import geopy.distance
import osmnx as ox
import folium
import networkx as nx
import json

from math import atan2, degrees, radians, sin, cos
from sklearn.neighbors import BallTree
import numpy as np
import pandas as pd
# Step 1: Define the place (Montreal) and load the road network
# Step 2: Simplify the graph
# graph = ox.simplify_graph(graph)

place_name = "Montreal, Quebec, Canada"
print('Loading graph')
graph = ox.load_graphml('data/montreal_crime.graphml')
for u, v, data in (graph.edges(data=True)):
    data['crimes'] = float(data['crimes'])
    data['weight'] = float(data['weight'])
print('Graph Loaded')
# Step 3: Find two points for demonstration (you can choose any lat/lon)
orig = (45.5017, -73.5673)  # Montreal city center
dest = (45.5175, -73.6568)  # A location west of the city center
def calculate_total_distance(G, path):
    total_distance = 0  # In meters
    for u, v in zip(path[:-1], path[1:]):
        edge_data = G[u][v][0]  # Access the first edge data (for MultiDiGraph)
        total_distance += edge_data.get("length", 0)  # Default to 0 if no length
    return total_distance

# Walking speed (in meters/second)
walking_speed = 1.4  # Average walking speed (~5 km/h)
def extract_path_geometry(G, path):
    full_path = []
    for u, v in zip(path[:-1], path[1:]):
        edge_data = G[u][v][0]  # For OSMnx MultiDiGraph, access the first edge data
        if "geometry" in edge_data:
            # Use the existing geometry
            coords = [(lat, lon) for lon, lat in edge_data["geometry"].coords]
        else:
            # If no geometry is present, use a straight line
            coords = [(G.nodes[u]["y"], G.nodes[u]["x"]), (G.nodes[v]["y"], G.nodes[v]["x"])]
        full_path.extend(coords)
    return full_path
G = graph
# Download a walking graph for Montreal
# G = ox.graph_from_place("Montreal, Quebec, Canada", network_type="walk")


# Function to calculate bearing between two coordinates
def calculate_bearing(lat1, lon1, lat2, lon2):
    """Calculate the bearing between two lat/lon points."""
    y = sin(radians(lon2 - lon1)) * cos(radians(lat2))
    x = cos(radians(lat1)) * sin(radians(lat2)) - sin(radians(lat1)) * cos(radians(lat2)) * cos(radians(lon2 - lon1))
    return (degrees(atan2(y, x)) + 360) % 360

def calculate_distance(G,u,v):
    start = G.nodes[u]["y"], G.nodes[u]["x"]
    dest = G.nodes[v]["y"], G.nodes[v]["x"]
    return geopy.distance.distance(start,dest).meters
# Function to simplify directions
# Simplify the path directions
def degree_to_compass(degree):
    """
    Converts a degree value (0-360) to a compass direction (e.g., North, North-East).
    
    Args:
        degree (float): The degree to convert (0-360).
        
    Returns:
        str: The compass direction.
    """
    compass_directions = [
        "North", "North-East", "East", "South-East", 
        "South", "South-West", "West", "North-West"
    ]
    # Divide 360° into 8 equal segments of 45°
    segment = 360 / len(compass_directions)
    
    # Round to the nearest compass direction
    index = int((degree + segment / 2) % 360 // segment)
    return compass_directions[index]

def direction_to_text(d):
    bearing = d["bearing"]
    street_name = d['street_name']
    direction = degree_to_compass(bearing)
    if street_name == 'Path':
        return f"Head {direction} for {d['distance']:.1f} meters"
    else:
        return f"Head {direction} on {street_name} for {d['distance']:.1f} meters"
all_names = set()
def simplify_directions(G, path, angle_threshold=20):
    """Simplify path into key directions based on bearing changes."""
    directions = []
    previous_bearing = 0
    segment_start = path[0]
    current_street_name = None

    for u, v in zip(path[:-1], path[1:]):
        # Get coordinates
        lat1, lon1 = G.nodes[u]["y"], G.nodes[u]["x"]
        lat2, lon2 = G.nodes[v]["y"], G.nodes[v]["x"]

        # Calculate bearing
        current_bearing = calculate_bearing(lat1, lon1, lat2, lon2)

        # Calculate distance of this edge
        edge_data = G[u][v][0]
        edge_distance = edge_data.get("length", 0)
        street_name = edge_data.get("name")
        if type(street_name) == list:
            street_name = street_name[0]
        if current_street_name is None:
            current_street_name = street_name
        all_names.add(street_name)
        if abs(current_bearing - previous_bearing) < angle_threshold or edge_distance < 10 or street_name == current_street_name and not (v == path[-1]):
            pass
        else:
            # add one path
            direction = {
                    "start_node": segment_start,
                    "end_node": u,
                    "distance": calculate_distance(G,segment_start,u),
                    "bearing": previous_bearing,
                    "street_name": current_street_name or "Path",
                }
            direction['message'] = direction_to_text(direction)
            directions.append(direction)
            current_street_name = street_name
            segment_start = u
            pass
        previous_bearing = current_bearing

    return directions

# Generate human-readable directions
def generate_directions_text(G, directions):
    """Convert simplified directions into human-readable text."""
    text_directions = [d['message'] for d in directions]
    return text_directions

def make_directions(G,path):
    simplified_directions = simplify_directions(G, path)
    # Generate directions text
    text_directions = generate_directions_text(G, simplified_directions)

    # Print the simplified directions
    for i, direction in enumerate(text_directions, start=1):
        print(f"{i}. {direction}")
    return simplified_directions

def get_path(orig,dest):
    # Convert latitude/longitude to nearest nodes in the graph
    print('getting nearest nodes')
    orig_node = ox.distance.nearest_nodes(graph, orig[1], orig[0])
    dest_node = ox.distance.nearest_nodes(graph, dest[1], dest[0])
    def get_path_with_weight(weight):
        print('got nearest node')
        shortest_path = nx.shortest_path(graph, orig_node, dest_node, weight=weight)
        print('got shortest path')
        # Get the full path geometry
        path_geometry = extract_path_geometry(graph, shortest_path)
        path_distance = calculate_total_distance(graph,shortest_path)
        return [path_geometry, path_distance, path_distance / 84, simplify_directions(graph,shortest_path)]
    
    return {'safe' : get_path_with_weight('weight'), 'dangerous' : get_path_with_weight('length')}



crime_data = pd.read_csv('./data/crimes_raw.csv')
coordinates = crime_data[['LATITUDE','LONGITUDE']].dropna()
# Convert coordinates to radians for BallTree
coordinates_rad = np.radians(coordinates.values)

# Build BallTree
tree = BallTree(coordinates_rad, metric='haversine')

def query_location(coord,radius=0.00002):
    indices = tree.query_radius(np.radians(coord),radius)
    return coordinates.iloc[indices[0]].values

def query_location_metric(coord,radius_km):
    radius = radius_km / 6371
    df = query_location(coord,radius)
    if df is None:
        return 0
    return len(df)