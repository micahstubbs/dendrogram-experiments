(an incomplete iteration.  it turns out this tweets dataset may not be a nice fit for this layout.)

an iteration that draws the small tweets dataset from the [Ch. 5, Fig. 15 - D3.js in Action](https://bl.ocks.org/emeeks/68728605f74113bc38dc) example.

If your tree dataset is small, then this example should be useful for showing how your dataset might look as a dendrogram.

---

D3’s [cluster layout](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](/@d3/tidy-tree), but are useful for dendrograms, hierarchical clustering and [phylogenetic trees](/@mbostock/tree-of-life). See also the [radial variant](/@d3/radial-dendrogram).`

inspired by https://observablehq.com/@d3/cluster-dendrogram
