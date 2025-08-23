export const languages = [
  { display: "C", monaco: "c", version: "11.2.0" },
  { display: "C++", monaco: "cpp", version: "11.2.0" },
  { display: "Java", monaco: "java", version: "17.0.1" },
  { display: "Python", monaco: "python", version: "3.10.0" },
  { display: "JavaScript", monaco: "javascript", version: "17.1.0" },
  { display: "TypeScript", monaco: "typescript", version: "4.4.4" },
  { display: "Go", monaco: "go", version: "1.17.3" },
  { display: "Rust", monaco: "rust", version: "1.56.1" },
  { display: "C#", monaco: "csharp", version: "6.0.100" },
  { display: "PHP", monaco: "php", version: "8.0.12" },
  { display: "Ruby", monaco: "ruby", version: "3.0.2" },
  { display: "Swift", monaco: "swift", version: "5.5.1" },
  { display: "Kotlin", monaco: "kotlin", version: "1.5.31" },
  { display: "R", monaco: "r", version: "4.1.2" },
  { display: "Scala", monaco: "scala", version: "3.1.0" },
  { display: "Perl", monaco: "perl", version: "5.34.0" },
];

export const boilerplates = {
  javascript: `// JavaScript Boilerplate
function main() {
  console.log("Hello, JavaScript!");
}
main();`,

  typescript: `// TypeScript Boilerplate
function main(): void {
  console.log("Hello, TypeScript!");
}
main();`,

  python: `# Python Boilerplate
def main():
    print("Hello, Python!")

if __name__ == "__main__":
    main()`,

  java: `// Java Boilerplate
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,

  cpp: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,

  c: `// C Boilerplate
#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,

  csharp: `// C# Boilerplate
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
    }
}`,

  go: `// Go Boilerplate
package main
import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`,

  rust: `// Rust Boilerplate
fn main() {
    println!("Hello, Rust!");
}`,

  php: `<?php
// PHP Boilerplate
echo "Hello, PHP!";
?>`,

  ruby: `# Ruby Boilerplate
def main
  puts "Hello, Ruby!"
end

main`,

  swift: `// Swift Boilerplate
import Foundation

print("Hello, Swift!")`,

  kotlin: `// Kotlin Boilerplate
fun main() {
    println("Hello, Kotlin!")
}`,

  r: `# R Boilerplate
print("Hello, R!")`,

  scala: `// Scala Boilerplate
object Main extends App {
  println("Hello, Scala!")
}`,

  perl: `# Perl Boilerplate
print "Hello, Perl!\\n";`,
};

export const themes = [
  "Dracula",
  "Monokai",
  "Monokai Dimmed",
  "One Dark Pro",
  "Solarized Dark",
  "Solarized Light",
  "GitHub Dark",
  "GitHub Light",
  "Nord",
  "Night Owl",
  "Tomorrow Night Blue",
  "Cobalt2",
  "Palenight",
  "Material Theme Darker",
  "Ayu Dark",
  "Ayu Light",
  "High Contrast",
];
