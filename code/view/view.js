/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 11 2022
 * @desc Clase View
 * @module view
 */

'use static';

import { Graph } from '../graph.js';
import { Point2D } from './point2d.js';
const POINT_SIZE = 30;

 /** @desc Clase View */
export class View {
  #context;
  #canvas;
  #height;
  #width;

  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   * @param {Graph} vertexCoverGraph - grafo a dibujar
   */
  constructor(canvas, vertexCoverGraph) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
    this.#height = Number(canvas.getAttribute('height'));
    this.#width = Number(canvas.getAttribute('width'));

    // GRAFO EJEMPLO
    /*this.graph = new Graph(6);
    this.vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

    for (let i = 0; i < this.vertices.length; i++) {
      this.graph.addVertex(this.vertices[i]);
    }

    this.graph.addEdge('A', 'B');
    this.graph.addEdge('A', 'D');
    this.graph.addEdge('A', 'E');
    this.graph.addEdge('B', 'C');
    this.graph.addEdge('D', 'E');
    this.graph.addEdge('E', 'F');
    this.graph.addEdge('E', 'C');
    this.graph.addEdge('C', 'F');
*/
    this.vertices = vertexCoverGraph.nodesTags;
    this.graph = vertexCoverGraph.graph;
    this.nodes = [];
    this.edges = [];
    //this.#createGraphNodes();
    //this.#createGraphEdges();
    
  }

  #createGraphNodes() {
    // Cuatro nodos por nivel
    let nodesPerLevel = 4;
    let nodeLevels = this.vertices.length / nodesPerLevel;
    let widthBetweenNodes = this.#width * 0.8 / nodesPerLevel;
    let heightBetweenNodes = this.#height * 0.8 / nodeLevels;

    let down = false;
    
    for (let level = 0; level < nodeLevels; ++level) {
      for (let node = 0; node < 4; ++node) {
        let coordinateX = widthBetweenNodes + node * widthBetweenNodes;
        let coordinateY = heightBetweenNodes / 4 + level * heightBetweenNodes;
        if (down) coordinateY += heightBetweenNodes / 4;
        this.nodes.push(new Point2D(coordinateX, coordinateY));
        down = !down;
      }
    }    
  }

  #drawGraphNodes() {      
    for (let index = 0; index < this.vertices.length; ++index) {
      //console.log(this.vertices[index], this.nodes[index].coordinateX, this.nodes[index].coordinateY);
      this.#context.beginPath();
      this.#context.fillStyle = 'red';
      this.#context.ellipse(this.nodes[index].coordinateX, this.nodes[index].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
      this.#context.fill();
      this.#context.stroke();

      this.#context.beginPath();
      this.#context.fillStyle = 'black';
      this.#context.font = '35px Arial';   
      this.#context.textAlign = "center";
      this.#context.textBaseline = "middle";
      this.#context.fillText(this.vertices[index], this.nodes[index].coordinateX, this.nodes[index].coordinateY);
      this.#context.fill();
    }    
  }

  #createGraphEdges() {
    let adjacentList = this.graph.adjacentList;
    let vertexIndex = 0;
    for (const vertex of adjacentList) {
      for (const adjacentNode of adjacentList.get(vertex[0])) {
        for (let index = 0; index < this.vertices.length; ++index) {
          if (adjacentNode === this.vertices[index]) {
            this.edges.push([this.nodes[vertexIndex], this.nodes[index]])
          }
        }
      }
      vertexIndex ++;
    }   
  }

  #drawGraphEdges() {    
    this.#context.lineWidth = 3;
    for (const edge of this.edges) {
      this.#context.beginPath();
      this.#context.strokeStyle = 'black';
      this.#context.moveTo(edge[0].coordinateX, edge[0].coordinateY);
      this.#context.lineTo(edge[1].coordinateX, edge[1].coordinateY);
      this.#context.stroke();
    }  
  }  

  /** @desc Método para animar redibujar la escena */
  update() {
    //this.#resizeCanvas();
    this.#resizeCanvasElements();
    this.#draw();
    
    window.requestAnimationFrame(() => this.update());
  }  

  /** @desc Método para dibujar la escena / mesa de poker */
  #draw() {  
    //this.#context.clearRect(0, 0, this.#width, this.#height);
    //this.#context.drawImage(this.#backgroundImage, 0, 0, this.#width, this.#height);
    this.#drawGraphEdges()
    this.#drawGraphNodes();    
  }  
   
  /** @desc Método para ajustar el tamaño del canvas al tamaño de la ventana */
  #resizeCanvas() {
    this.#width = window.innerWidth * 0.96;
    this.#height = window.innerHeight * 0.85;
    this.#canvas.setAttribute('height', this.#height);
    this.#canvas.setAttribute('width', this.#width);
  }

   /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  #resizeCanvasElements() {
  }

  /**
   * @desc Método getter para obtener la altura del canvas
   * @return {Number} altura del canvas
   */
  get height() {
    return(this.#height)
  }

  /**
   * @desc Método getter para obtener la anchura del canvas
   * @return {Number} anchura del canvas
   */
   get width() {
    return(this.#width)
  }
}
