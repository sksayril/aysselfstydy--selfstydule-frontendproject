import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, X, ChevronLeft, ChevronUp } from 'lucide-react';

// Expanded blog data with full content and additional images
const blogs = [
  {
    id: 1,
    title: "Understanding Quantum Physics: A Beginner's Guide",
    excerpt: "Dive into the fascinating world of quantum mechanics and discover how it shapes our understanding of the universe...",
    content: "Quantum physics, also known as quantum mechanics, is a fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles. Unlike classical physics, quantum mechanics provides a mathematical description of the dual particle-like and wave-like behavior and interactions of matter and energy.\n\nKey concepts include:\n\n• Wave-Particle Duality: Objects exhibit both wave and particle properties\n• Heisenberg's Uncertainty Principle: The more precisely the position is determined, the less precisely the momentum is known\n• Quantum Entanglement: Particles become interconnected and the quantum state of each cannot be described independently\n\nThese principles have led to technological breakthroughs including lasers, transistors, and magnetic resonance imaging.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3"
    ],
    category: "Physics",
    readTime: "5 min read",
    date: "March 6, 2025",
  },
  {
    id: 2,
    title: "The Rise of Artificial Intelligence in Education",
    excerpt: "Explore how AI is transforming the educational landscape and creating new opportunities for learning...",
    content: "Artificial Intelligence is revolutionizing education by creating personalized learning experiences tailored to individual student needs. These AI-powered systems can adapt in real-time, providing immediate feedback and adjusting difficulty levels based on student performance.\n\nSome key applications include:\n\n• Intelligent Tutoring Systems: AI tutors that provide personalized guidance and support\n• Automated Grading: Systems that can evaluate essays and open-ended questions\n• Content Recommendation: AI that suggests relevant resources based on learning patterns\n• Administrative Efficiency: Automating routine tasks so educators can focus on teaching\n\nAs we move forward, the integration of AI in education promises to make learning more accessible, engaging, and effective for students of all abilities and backgrounds.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1526378787940-576a539ba69d?ixlib=rb-4.0.3"
    ],
    category: "Technology",
    readTime: "7 min read",
    date: "March 6, 2025",
  },
  {
    id: 3,
    title: "Biology Breakthroughs: Latest Discoveries in 2025",
    excerpt: "Stay updated with the most recent discoveries in biological sciences and their impact on medicine...",
    content: "The field of biology continues to evolve rapidly in 2025, with breakthrough discoveries that hold tremendous promise for human health and our understanding of life itself.\n\nRecent advances include:\n\n• CRISPR 2.0: Enhanced gene editing techniques with greater precision and fewer off-target effects\n• Organoid Development: Lab-grown miniature organs that mimic real organ functions for drug testing and disease modeling\n• Microbiome Therapies: New treatments based on gut bacteria manipulation to address various diseases\n• Synthetic Biology: Creating artificial biological systems with novel functions\n\nThese developments are already transforming medical treatments, environmental conservation efforts, and our fundamental understanding of biological processes. The convergence of biology with other fields like artificial intelligence and nanotechnology is opening up entirely new frontiers of scientific exploration.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?ixlib=rb-4.0.3"
    ],
    category: "Biology",
    readTime: "6 min read",
    date: "March 6, 2025",
  },
];

// Featured blog with extended content
const featuredBlog = {
  id: 0,
  title: "The Future of Education: Trends to Watch in 2025",
  excerpt: "Discover the emerging trends that are shaping the future of education, from AI-powered learning to virtual reality classrooms...",
  content: "Education is undergoing a profound transformation in 2025, driven by technological innovation, changing workforce demands, and evolving pedagogical approaches.\n\nThe most significant trends include:\n\n• Immersive Learning: Virtual and augmented reality creating deeply engaging educational experiences\n• AI-Powered Personalization: Tailoring education to individual learning styles, pace, and interests\n• Microlearning: Bite-sized learning modules designed for efficiency and retention\n• Skills-Based Credentials: A shift from traditional degrees to specific skill certification\n• Global Classroom Connectivity: Technology enabling worldwide collaboration between students\n\nThese changes are democratizing access to quality education, breaking down geographical barriers, and preparing students for careers that may not even exist yet. As we embrace these innovations, the traditional boundaries of education continue to expand, creating lifelong learning opportunities for people of all ages and backgrounds.",
  image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3",
  gallery: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3"
  ],
  category: "Education",
  readTime: "8 min read",
  date: "March 6, 2025",
};

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<typeof featuredBlog | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openBlogModal = (blog: typeof featuredBlog) => {
    setSelectedBlog(blog);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextImage = () => {
    if (!selectedBlog) return;
    setCurrentImageIndex((prev) =>
      prev === selectedBlog.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedBlog) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedBlog.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Latest Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest educational insights, study tips, and academic news
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-6 md:p-8">
                <div className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Featured
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {featuredBlog.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{featuredBlog.date}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span>{featuredBlog.readTime}</span>
                </div>
                <button
                  onClick={() => openBlogModal(featuredBlog)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <div className="text-gray-500 text-sm ml-auto flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {blog.date}
                  </div>
                  <button
                    onClick={() => openBlogModal(blog)}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center hover:underline"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Modal Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={closeBlogModal}>
          <div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with close button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedBlog.title}</h2>
              <button
                onClick={closeBlogModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img
                    src={selectedBlog.gallery[currentImageIndex]}
                    alt={`${selectedBlog.title} - image ${currentImageIndex + 1}`}
                    className="object-cover w-full h-[300px]"
                  />
                </div>

                {/* Gallery Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>

                {/* Image Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1 text-xs text-white">
                  {currentImageIndex + 1} / {selectedBlog.gallery.length}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center mb-4 space-x-4">
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {selectedBlog.category}
                  </span>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedBlog.date}
                  </div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedBlog.readTime}
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-blue max-w-none">
                  {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-4 border-t flex space-x-2 overflow-x-auto">
              {selectedBlog.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-blue-500 scale-105' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-16 w-24 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => {
                const modalContent = document.querySelector('.overflow-y-auto');
                if (modalContent) modalContent.scrollTop = 0;
              }}
              className="absolute bottom-20 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
