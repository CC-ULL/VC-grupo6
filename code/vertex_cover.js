/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Vertex Cover class
 * @module VertexCover
 */

'use strict';

export class VertexCover {
  
  constructor(threeSAT) {
      this.#threeSAT = threeSAT;
      this.graph = new Graph();
  }

 
  buildVertexCover() {
    this.createLiterals();
    this.createClauses();

    //this.ixArrowView();            
    //this.configureView();
  }

  /// <summary>
  /// Create the literals in the graph
  /// </summary>
  createLiterals() {
      // Create the graph literals
      for (let i = 0; i < threeSAT.Literals.Count; i++) {
          graph.AddEdge(threeSAT.Literals[i], "!" + threeSAT.Literals[i]);
          graph.FindNode(threeSAT.Literals[i]).Attr.FillColor = Color.LightGreen;
          graph.FindNode("!" + threeSAT.Literals[i]).Attr.FillColor = Color.LightGreen;
      }
  }

  /// <summary>
  /// Create the clauses and his edges in the graph
  /// </summary>
  createClauses() {
    let aux = 1;
    for (const clause of threeSAT.clauses) {
      for (let i = 0; i < clause.length; i++) {
        graph.AddEdge("a" + aux + "[" + i + "]", clause.literals[i]);
        graph.FindNode("a" + aux + "[" + i + "]").Attr.FillColor = Color.Yellow;
        if (i > 0)
            graph.AddEdge("a" + aux + "[" + (i - 1) + "]", "a" + aux + "[" + i + "]");
      }
      graph.AddEdge("a" + aux + "[" + 0 + "]", "a" + aux + "[" + (clause.literals.Count - 1) + "]");
      aux++;
    }
  }

  /// <summary>
  /// Delete arrows and make the graph bidirectional
  /// </summary>
  fixArrowView() {
    foreach (Edge edge in graph.Edges) {
      edge.Attr.ArrowheadAtSource = ArrowStyle.None;
      edge.Attr.ArrowheadAtTarget = ArrowStyle.None;
    }
  }
  
  /// <summary>
  /// Some configuration before show
  /// </summary>
  private void ConfigureView(){
      // Bind the graph to the viewer 
      viewer.Graph = graph;
      // Associate the viewer with the form 
      form.SuspendLayout();
      viewer.Dock = DockStyle.Fill;
      form.Controls.Add(viewer);
      form.ResumeLayout();
  }

  /// <summary>
  /// Show the form 
  /// </summary>
  public void Show() {
      form.ShowDialog();
  }
}
}