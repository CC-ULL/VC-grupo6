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
 
  createLiterals() {
    let clauseNumber = 0; 
    // Cantidad de nodos = 2 * threeSAT.literals.length + 3 * threeSAT.clauses.length
    for (const literal of this.#threeSAT.literals) {
      this.graph.AddVertex(literal);
      this.graph.AddVertex('!' + literal);
      this.graph.AddEdge(literal, '!' + literal);
    }

    for (const clause of this.#threeSAT.clauses) {
      this.graph.AddVertex('a' + clauseNumber + '[1]');
      this.graph.AddVertex('a' + clauseNumber + '[2]');
      this.graph.AddVertex('a' + clauseNumber + '[3]');

      this.graph.AddEdge('a' + clauseNumber + '[1]', 'a' + clauseNumber + '[2]');
      this.graph.AddEdge('a' + clauseNumber + '[1]', 'a' + clauseNumber + '[3]');
      this.graph.AddEdge('a' + clauseNumber + '[2]', 'a' + clauseNumber + '[3]');

      ++ clauseNumber;
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