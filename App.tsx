
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Layers, 
  Zap, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Github,
  Mail,
  ExternalLink
} from 'lucide-react';

// --- Components ---

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => (
  <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto my-4 text-sm border-l-4 border-java-500 shadow-sm">
    <code>{code.trim()}</code>
  </pre>
);

const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ id, title, icon, children }) => (
  <section id={id} className="scroll-mt-24 mb-16 animate-in fade-in duration-700">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-java-500/10 rounded-xl text-java-500">
        {icon}
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{title}</h2>
    </div>
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
      {children}
    </div>
  </section>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-slate-700 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left font-semibold text-lg hover:text-java-500 transition-colors"
      >
        <span>{question}</span>
        <ChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { id: 'hero', label: 'Home', icon: <Zap className="w-4 h-4" /> },
    { id: 'core-java', label: 'Core Java', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'jvm', label: 'JVM Architecture', icon: <Cpu className="w-4 h-4" /> },
    { id: 'collections', label: 'Collections', icon: <Layers className="w-4 h-4" /> },
    { id: 'multithreading', label: 'Multithreading', icon: <Zap className="w-4 h-4" /> },
    { id: 'tips', label: 'Interview Tips', icon: <Award className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-java-500 text-white p-1.5 rounded-lg shadow-lg">
              <span className="font-bold text-xl">J</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:block">JavaCheatSheet</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm font-medium hover:text-java-500 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-slate-900 pt-20 px-4 lg:hidden">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="flex items-center gap-3 text-2xl font-bold"
                >
                  <span className="text-java-500">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8 md:py-24">
        
        {/* Hero Section - Redesigned without image */}
        <section id="hero" className="mb-24 text-center max-w-4xl mx-auto">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-1 bg-java-500 blur opacity-25 rounded-full"></div>
            <span className="relative bg-java-50 dark:bg-java-900/30 text-java-600 dark:text-java-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
              Free Revision Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight text-slate-900 dark:text-white">
            Master Your Interview with the <br className="hidden md:block" />
            <span className="text-java-500">Java Interview Cheat Sheet</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
            Ace your next software engineering role with our ultimate guide. 
            Designed for quick revision, this guide covers Core Java, JVM architecture, 
            and performance tuning—perfect for candidates needing a 10-minute refresh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#core-java" onClick={(e) => handleNavClick(e, 'core-java')} className="px-10 py-4 bg-java-500 text-white rounded-full text-lg font-bold shadow-xl shadow-java-500/40 hover:bg-java-600 transition-all transform hover:-translate-y-1">
              Start Revision Now
            </a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="px-10 py-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all transform hover:-translate-y-1">
              Common FAQs
            </a>
          </div>
        </section>

        {/* AdSense In-Content */}
        <div className="w-full h-24 bg-gray-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-slate-700 mb-20 italic text-sm text-gray-500">
          {/* AdSense In-Content Placeholder */}
          Placeholder: In-Content Advertisement
        </div>

        {/* Core Java Section */}
        <Section id="core-java" title="Core Java Cheat Sheet" icon={<BookOpen />}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OOP Principles (PIE)</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="font-bold text-java-500">P:</span> 
                  <span><strong>Polymorphism:</strong> One interface, multiple methods. Method Overloading (Compile-time) and Overriding (Runtime).</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-java-500">I:</span> 
                  <span><strong>Inheritance:</strong> Mechanism where one class acquires properties of another (extends). Helps in code reusability.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-java-500">E:</span> 
                  <span><strong>Encapsulation:</strong> Wrapping data (variables) and code (methods) together as a single unit. Data hiding via private members.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-java-500">A:</span> 
                  <span><strong>Abstraction:</strong> Hiding implementation details and showing only functionality (Interfaces and Abstract classes).</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Access Modifiers</h3>
              <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th className="p-2 text-left border border-gray-100 dark:border-slate-700">Modifier</th>
                    <th className="p-2 text-left border border-gray-100 dark:border-slate-700">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border border-gray-100 dark:border-slate-700 font-medium">Public</td><td className="p-2 border border-gray-100 dark:border-slate-700">Everywhere</td></tr>
                  <tr><td className="p-2 border border-gray-100 dark:border-slate-700 font-medium">Protected</td><td className="p-2 border border-gray-100 dark:border-slate-700">Same pkg + Subclasses</td></tr>
                  <tr><td className="p-2 border border-gray-100 dark:border-slate-700 font-medium">Default</td><td className="p-2 border border-gray-100 dark:border-slate-700">Package only</td></tr>
                  <tr><td className="p-2 border border-gray-100 dark:border-slate-700 font-medium">Private</td><td className="p-2 border border-gray-100 dark:border-slate-700">Class only</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-8">
            <h3 className="text-xl font-bold mb-4">Critical Java Differences</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">final vs finally vs finalize</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>final:</strong> Keyword to mark constant values, prevent inheritance, or method overriding.<br/>
                  <strong>finally:</strong> Block used for cleanup code (executes even if exception occurs).<br/>
                  <strong>finalize:</strong> Method called by Garbage Collector before destroying an object.
                </p>
                <CodeBlock code={`
final int MAX_SIZE = 100;
try { 
  // Code 
} finally { 
  // Always runs 
}`} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">equals() vs ==</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code>==</code> checks reference equality (do they point to same memory address?).<br/>
                    <code>equals()</code> checks content equality (logical equality).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">String vs StringBuilder vs StringBuffer</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>String:</strong> Immutable (Heap pollution risk).<br/>
                    <strong>StringBuilder:</strong> Mutable, not thread-safe (Fastest).<br/>
                    <strong>StringBuffer:</strong> Mutable, thread-safe (Slower).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* JVM Section */}
        <Section id="jvm" title="JVM Cheat Sheet" icon={<Cpu />}>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">JDK vs JRE vs JVM</h3>
              <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <div className="space-y-4">
                  <div className="p-3 border-2 border-java-500 rounded-lg text-center">
                    <span className="font-bold">JDK</span> (Dev Kit: Tools + JRE)
                    <div className="mt-2 p-3 border-2 border-gray-400 rounded-lg">
                      <span className="font-bold">JRE</span> (Runtime Environment: Libs + JVM)
                      <div className="mt-2 p-3 border-2 border-gray-300 rounded-lg bg-white dark:bg-slate-800">
                        <span className="font-bold text-java-500">JVM</span> (Virtual Machine: Executes Bytecode)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Memory Management</h3>
              <ul className="space-y-4">
                <li className="bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 p-4 rounded-lg">
                  <span className="font-bold text-java-500">Heap:</span> Stores all Objects and instance variables. Shared across threads. Divided into Young Gen and Old Gen.
                </li>
                <li className="bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 p-4 rounded-lg">
                  <span className="font-bold text-java-500">Stack:</span> Stores local variables and partial results. Each thread has its own stack. LIFO structure.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-6">Garbage Collection (GC) Basics</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Serial GC', desc: 'Single threaded. Best for small apps.' },
                { name: 'Parallel GC', desc: 'Throughput oriented. Default in older Java.' },
                { name: 'CMS', desc: 'Low latency. Scans heap in parallel with app threads.' },
                { name: 'G1 GC', desc: 'Best for large heaps. Replaces CMS since Java 9.' }
              ].map(gc => (
                <div key={gc.name} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
                  <h4 className="font-bold text-java-500 mb-1">{gc.name}</h4>
                  <p className="text-xs text-gray-500">{gc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Collections Section */}
        <Section id="collections" title="Java Collections Cheat Sheet" icon={<Layers />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-8 border border-gray-100 dark:border-slate-700">
              <thead className="bg-java-500 text-white">
                <tr>
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-left">ArrayList</th>
                  <th className="p-3 text-left">LinkedList</th>
                  <th className="p-3 text-left">HashSet</th>
                  <th className="p-3 text-left">HashMap</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-slate-700">
                  <td className="p-3 font-bold">Access</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td><td className="p-3">O(1)</td><td className="p-3">O(1)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700">
                  <td className="p-3 font-bold">Insertion</td><td className="p-3">O(n)*</td><td className="p-3">O(1)</td><td className="p-3">O(1)</td><td className="p-3">O(1)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700">
                  <td className="p-3 font-bold">Duplicates</td><td className="p-3 text-green-500">Allowed</td><td className="p-3 text-green-500">Allowed</td><td className="p-3 text-red-500">No</td><td className="p-3 text-red-500">No (Keys)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="text-java-500" /> Key Comparisons</h3>
              <ul className="space-y-4 text-sm">
                <li><strong>Comparable vs Comparator:</strong> Comparable provides natural ordering (compareTo); Comparator provides custom ordering (compare).</li>
                <li><strong>HashMap vs ConcurrentHashMap:</strong> ConcurrentHashMap allows concurrent access without locking the whole map (Segment locking).</li>
                <li><strong>Fail-fast vs Fail-safe:</strong> Fail-fast (Iterator) throws <code>ConcurrentModificationException</code> if collection modified. Fail-safe works on copy.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Collection Tip</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Choose <strong>ArrayList</strong> when frequent access is needed. Choose <strong>LinkedList</strong> for high frequency of insertions/deletions at the start or middle.
              </p>
              <CodeBlock code={`
List<String> list = new ArrayList<>();
Map<Integer, String> map = new HashMap<>();
Set<String> set = new HashSet<>();
              `} />
            </div>
          </div>
        </Section>

        {/* Multithreading Section */}
        <Section id="multithreading" title="Multithreading Quick Notes" icon={<Zap />}>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">Thread Creation</h3>
              <div className="space-y-4">
                <div className="p-4 bg-java-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-bold mb-2">1. Thread Class</p>
                  <CodeBlock code={`class MyThread extends Thread { public void run(){...} }`} />
                </div>
                <div className="p-4 bg-java-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-bold mb-2">2. Runnable Interface (Recommended)</p>
                  <CodeBlock code={`class MyTask implements Runnable { public void run(){...} }`} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Concurrency Keywords</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><strong>synchronized:</strong> Mutual exclusion; only one thread enters block/method at a time.</li>
                  <li><strong>volatile:</strong> Ensures variable is read/written directly from main memory (not CPU cache).</li>
                  <li><strong>wait(), notify():</strong> Used for inter-thread communication. Must be called from synchronized context.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Executor Framework</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Provides a pool of threads (<code>Executors.newFixedThreadPool(10)</code>) to manage thread lifecycle efficiently. 
                  Prevents resource exhaustion.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq" title="Java Interview FAQs" icon={<HelpCircle />}>
          <div className="max-w-4xl mx-auto">
            <FAQItem 
              question="Can we override the static method in Java?" 
              answer="No, static methods cannot be overridden. If a child class defines a static method with the same signature, it's called Method Hiding, not overriding, because static methods are bound at compile-time (Static binding)." 
            />
            <FAQItem 
              question="What is the difference between Checked and Unchecked Exceptions?" 
              answer="Checked exceptions (e.g., IOException) are checked at compile-time and must be handled using try-catch or throws. Unchecked exceptions (e.g., NullPointerException) occur at runtime and represent programming errors." 
            />
            <FAQItem 
              question="How does HashMap work internally?" 
              answer="It uses an array of Nodes (Buckets). It uses hashCode() to find the bucket index and equals() to find the specific element in case of a collision. In Java 8, if a bucket gets too full, it switches from a LinkedList to a Balanced Tree (O(log n))." 
            />
            <FAQItem 
              question="Why are Strings immutable in Java?" 
              answer="Security, Synchronization (thread-safety), and Performance (String Pool). If strings were mutable, multiple variables pointing to the same string could change values unexpectedly, causing security vulnerabilities." 
            />
            <FAQItem 
              question="What is a 'Memory Leak' in Java?" 
              answer="A memory leak happens when objects are no longer being used by the application, but the Garbage Collector cannot remove them because they are still being referenced (e.g., unclosed resources, static collections)." 
            />
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-java-500 text-white p-1.5 rounded-lg">
                  <span className="font-bold text-xl">J</span>
                </div>
                <span className="font-extrabold text-xl text-white">Java Interview Cheat Sheet</span>
              </div>
              <p className="max-w-md text-slate-500">
                Helping developers around the world crush their Java interviews since 2023. Our mission is to provide accurate, concise, and professional tech content for the developer community.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="hover:text-java-500 transition-colors">Home</a></li>
                <li><a href="#core-java" onClick={(e) => handleNavClick(e, 'core-java')} className="hover:text-java-500 transition-colors">Core Java</a></li>
                <li><a href="#jvm" onClick={(e) => handleNavClick(e, 'jvm')} className="hover:text-java-500 transition-colors">JVM Notes</a></li>
                <li><a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-java-500 transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Legal & Contact</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-java-500 transition-colors">Privacy Policy</a></li>
                <li className="flex items-center gap-2 text-xs"><Mail className="w-4 h-4" /> contact@javacheatsheet.com</li>
              </ul>
            </div>
          </div>
          
          <div className="w-full h-24 bg-slate-800 flex items-center justify-center rounded-lg border border-slate-700 mb-12 italic text-xs">
            {/* AdSense Footer Placeholder */}
            Placeholder: Footer Advertisement
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Java Interview Cheat Sheet. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
