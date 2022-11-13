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

import { VertexCover } from '../vertex_cover.js';
import { Point2D } from './point2d.js';
const POINT_SIZE = 30;

 /** @desc Clase View */
export class View {
  #context;
  #canvas;
  #height;
  #width;

  #vertexCover;

  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   * @param {VertexCover} vertexCover - problema VC
   */
  constructor(canvas, vertexCover) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
    this.#height = Number(canvas.getAttribute('height'));
    this.#width = Number(canvas.getAttribute('width'));

    this.#vertexCover = vertexCover;
    this.allNodes = [];
    this.literalNodes = [];
    this.clauseNodes = [];    
    this.edges = [];

    this.allTags = [];
    this.literalTags = vertexCover.literalTags;
    this.clauseLiteralsTags = vertexCover.clauseLiteralTags;   
    
    this.#createGraphNodes();
    this.#createGraphEdges();    
  }

  /** @desc Método para crear los nodos del grafo */
  #createGraphNodes() {
    // Literales. Nodos de la parte superior.
    let widthBetweenNodes = this.#width * 0.95 / this.literalTags.length;
    let heightBetweenNodes = this.#height * 0.2;        
    
    for (let node = 0; node < this.literalTags.length; ++node) {
      let coordinateX = (this.#width * 0.05) + node * widthBetweenNodes;
      let coordinateY = heightBetweenNodes;
      
      this.literalNodes.push(new Point2D(coordinateX, coordinateY));      
    }
    // Cláusulas. Nodos de la parte inferior.
    let down = false;
    let nodeCounter = 0;
    widthBetweenNodes = this.#width * 0.95 / this.clauseLiteralsTags.length;
    heightBetweenNodes = this.#height * 0.6;

    for (const clause of this.#vertexCover.threeSAT.clauses) {  
      down = !down;    
      for (const literal of clause.literals) {
        let coordinateX = (this.#width * 0.05) + nodeCounter * widthBetweenNodes;
        let coordinateY = heightBetweenNodes;
        this.clauseNodes.push(new Point2D(coordinateX, coordinateY + (down * heightBetweenNodes / 4)));
        down = !down;
        ++ nodeCounter;
      }
    }
    this.allNodes = this.literalNodes.concat(this.clauseNodes);
    this.allTags = this.literalTags.concat(this.clauseLiteralsTags);
  }

  /** @desc Método para dibujar todos los nodos del grafo */
  #drawGraphNodes() {   
    this.#context.lineWidth = 1;   
    this.#drawLiteralNodes();
    this.#drawClauseNodes();
  }

  /** @desc Método para dibujar los nodos del grafo referentes a los literales*/
  #drawLiteralNodes() {
    for (let index = 0; index < this.literalTags.length; ++index) {
      this.#context.beginPath();
      this.#context.fillStyle = 'yellow';
      this.#context.ellipse(this.literalNodes[index].coordinateX, this.literalNodes[index].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
      this.#context.fill();
      this.#context.stroke();

      this.#context.beginPath();
      this.#context.fillStyle = 'black';
      this.#context.font = '35px Arial';   
      this.#context.textAlign = "center";
      this.#context.textBaseline = "middle";
      this.#context.fillText(this.literalTags[index], this.literalNodes[index].coordinateX, this.literalNodes[index].coordinateY);
      this.#context.fill();
    }
  }

  /** @desc Método para dibujar los nodos del grafo componente de las cláusulas*/
  #drawClauseNodes() {
    for (let index = 0; index < this.clauseLiteralsTags.length; ++index) {
      this.#context.beginPath();
      this.#context.fillStyle = 'orange';
      this.#context.ellipse(this.clauseNodes[index].coordinateX, this.clauseNodes[index].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
      this.#context.fill();
      this.#context.stroke();

      this.#context.beginPath();
      this.#context.fillStyle = 'black';
      this.#context.font = '25px Arial';   
      this.#context.textAlign = "center";
      this.#context.textBaseline = "middle";
      this.#context.fillText(this.clauseLiteralsTags[index], this.clauseNodes[index].coordinateX, this.clauseNodes[index].coordinateY);
      this.#context.fill();
    }
  }
  
  /** @desc Método para crear las aristas del grafo */
  #createGraphEdges() {
    let adjacentList = this.#vertexCover.graph.adjacentList;
    let vertexIndex = 0;
    for (const vertex of adjacentList) {
      for (const adjacentNode of adjacentList.get(vertex[0])) {
        for (let index = 0; index < this.allTags.length; ++index) {
          if (adjacentNode === this.allTags[index]) {
            //if (this.allNodes[vertexIndex] !== undefined)
            this.edges.push([this.allNodes[vertexIndex], this.allNodes[index]])
          }
        }
      }
      vertexIndex ++;
    }
  }

  /** @desc Método para dibujar las aristas del grafo */
  #drawGraphEdges() {    
    this.#context.lineWidth = 2;
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
    this.#drawGraphEdges();
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
