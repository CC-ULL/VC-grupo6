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
  // private ThreeSAT threeSAT;
  #threeSAT;
  // The form
  // private Form form;
  #form;
  // The viewer object 
  // private GViewer viewer;
  #viewer;
  // The graph itself
  // private Graph graph;
  #graph;

  /// <summary>
  /// Instantiate a new Vetex Cover problem
  /// </summary>
  /// <param name="threeSAT"></param>
  constructor(threeSAT) {
      this.#threeSAT = threeSAT;
      // Creates a form 
      form = new Form();
      // Create a viewer object 
      viewer = new GViewer();
      // Create the graph object
      graph = new Graph("graph");
  }

  /// <summary>
  /// Build the vertex cover instance using the 3-SAT content
  /// </summary>
  buildVertexCover() {
    createLiterals();
    createClauses();

    fixArrowView();            
    configureView();
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
    foreach (Clause clause in threeSAT.Clauses) {
      for (int i = 0; i < clause.literals.Count; i++) {
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