an iteration that draws a smaller dataset.

If your tree dataset is small, then this example should be useful for showing how your dataset might look as a dendrogram.

See also the [Dendrogram Large Dataset](https://bl.ocks.org/micahstubbs/50c3189d7ed8616dc43d65b729099b30) and [react-app](https://github.com/micahstubbs/dendrogram-experiments/tree/master/react-app) examples.

---

D3’s [cluster layout](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](/@d3/tidy-tree), but are useful for dendrograms, hierarchical clustering and [phylogenetic trees](/@mbostock/tree-of-life). See also the [radial variant](/@d3/radial-dendrogram).`

---

inspired by 
- https://observablehq.com/@d3/cluster-dendrogram 
- the example [Ch. 5, Fig. 15 - D3.js in Action](https://bl.ocks.org/emeeks/68728605f74113bc38dc) 
- this search https://blockbuilder.org/search?text=dendrogram&thumb=true&d3version=v4
