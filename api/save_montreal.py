import osmnx as ox

place_name = "Montreal, Quebec, Canada"
print("getting graph")
graph = (ox.graph_from_place(place_name, network_type="walk"))
print('got graph')
ox.save_graphml(graph,'./data/montreal.graphml')
print('saved graph')