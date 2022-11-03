
'use strict';

    /// <summary>
    /// Represent a 3-SAT problem structure with his caluses and literals
    /// </summary>
export class ThreeSAT {
        /// <summary>
        /// All the literals
        /// </summary>
        public List<string> Literals { get; set; }

        /// <summary>
        /// Total number of literals in the 3-SAT
        /// </summary>
        public int NumberOfLiterals { get; set; }

        /// <summary>
        /// All the clauses
        /// </summary>
        public List<Clause> Clauses { get; set; }

        /// <summary>
        /// The positive integer K
        /// </summary>
        public int K { get; set; }

        /// <summary>
        /// Max size of clauses, each clause have exactly 3 literals
        /// </summary>
        public readonly int SIZE = 3;

        /// <summary>
        /// Instantiate a new 3-SAT problem
        /// </summary>
        public ThreeSAT() {
            Literals = new List<string>();
            Clauses = new List<Clause>();
            NumberOfLiterals = 0;
        }

        /// <summary>
        /// Clear the data structure
        /// </summary>
        public void Clear() {
            Literals = new List<string>();
            Clauses = new List<Clause>();
            NumberOfLiterals = 0;
        }

        /// <summary>
        /// String representing this object
        /// </summary>
        /// <returns> The string containing the data </returns>
        public override string ToString() {
            string output = "U = {";

            foreach (string literal in Literals) {
                output += literal + ", ";
            }

            output += Literals[NumberOfLiterals - 1] + "} ";
            output += "C = {";

            foreach (Clause clause in Clauses) 
                output += clause + ",";

            //output = output.substring(0, output.length() - 1);
            output += "} k = " + K;

            return output;
        }
    }
}