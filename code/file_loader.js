/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc File loader class
 * @module FileLoader
 */

'use strict';

export class FileLoader {
 // The 3-SAT instance
 private ThreeSAT threeSAT;
 // The readed lines
 private string[] lines;
 // The path to the file location
 public string PathToFileName { get; private set; }

 /// <summary>
 /// Instantiate a new reader for 3-SAT files
 /// </summary>
 /// <param name="threeSAT"> The 3-SAT instance to create </param>
 /// <param name="pathToFileName"> The path to the file location </param>
 public FileLoader(ThreeSAT threeSAT, string pathToFileName) {
     this.threeSAT = threeSAT;
     PathToFileName = pathToFileName;
 }
    
 /// <summary>
 /// Load from file into an 3-SAT instance
 /// </summary>
 public void LoadFile() {
     if (threeSAT.NumberOfLiterals > 0 || threeSAT.Literals.Count > 0 || threeSAT.Clauses.Count > 0)
         threeSAT.Clear();

     try {
         ReadAllFileContent();
         SetNumberOfLiterals();
         SkipArrayElements(1);
         AddAllLiterals();
         SkipArrayElements(threeSAT.NumberOfLiterals);
         CreateAllClauses();
         SetKValue();
     } catch(Exception error) {
         Console.WriteLine(error.Message);
     }
 }

 /// <summary>
 /// Read all the file contain and store it in an array
 /// </summary>
 private void ReadAllFileContent() {
     lines = File.ReadAllLines(PathToFileName);
 }

 /// <summary>
 /// Number of literals from the text file
 /// </summary>
 private void SetNumberOfLiterals() {
     int temp = Int32.Parse(Regex.Replace(lines[0], @"\s+", string.Empty));
     threeSAT.NumberOfLiterals = temp;           
 }

 /// <summary>
 /// Delete the n elements in the array, it delete the elements from start to n. 
 /// It's used just for prevent using it again
 /// </summary>
 private void SkipArrayElements(int n) {
     lines = lines.Skip(n).ToArray();
 }

 /// <summary>
 /// Add all the literals to the 3-SAT problem
 /// </summary>
 private void AddAllLiterals() {
     for (int i = 0; i < threeSAT.NumberOfLiterals; i++)
         threeSAT.Literals.Add(lines[i]);
 }

 /// <summary>
 /// Create all the clauses for the 3-SAT problem
 /// </summary>
 private void CreateAllClauses() {

     // For every line, all the current lines should be clauses
     for (int i = 0; i < lines.Length; i++) {
         string[] line = lines[i].Split(null); // Split by spaces
         Clause clause = new Clause();
         for (int j = 0; j < threeSAT.SIZE; j++) 
             clause.AddLiteral(line[j]);
         
         threeSAT.Clauses.Add(clause);
     }
 }

 /// <summary>
 /// Set the value of K in the 3-SAT
 /// </summary>
 private void SetKValue() {
     threeSAT.K = threeSAT.Literals.Count + 2 * threeSAT.Clauses.Count;
 }
}
}