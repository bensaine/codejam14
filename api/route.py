
import osmnx as ox
import folium
import networkx as nx
import json

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
def get_path(orig,dest):
    # Convert latitude/longitude to nearest nodes in the graph
    print('getting nearest nodes')
    orig_node = ox.distance.nearest_nodes(graph, orig[1], orig[0])
    dest_node = ox.distance.nearest_nodes(graph, dest[1], dest[0])
    def get_path_with_weight(weight):
        print('got nearest node')
        shortest_path = nx.shortest_path(graph, orig_node, dest_node, weight=weight)
        print('got shortest path')
        # Add the nodes and the shortest path to the map
        path_coords = [(graph.nodes[node]['y'], graph.nodes[node]['x']) for node in shortest_path]
        return path_coords
    
    return {'safe' : get_path_with_weight('weight'), 'dangerous' : get_path_with_weight('length')}
