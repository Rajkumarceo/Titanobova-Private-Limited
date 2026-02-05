import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Courses() {
  const navigate = useNavigate()

  const courses = [
    {
      id: 1,
      icon: '💼',
      title: 'Business Strategy',
      duration: '8 weeks',
      level: 'intermediate',
      price: 4999,
      desc: 'Master strategic planning and business development',
      topics: ['Market analysis', 'Strategic planning', 'Growth strategies', 'Competitive analysis']
    },
    {
      id: 2,
      icon: '💻',
      title: 'Web Development',
      duration: '12 weeks',
      level: 'beginner',
      price: 4999,
      desc: 'Learn modern web technologies and frameworks',
      topics: ['React.js', 'Node.js', 'Database design', 'API development']
    },
    {
      id: 3,
      icon: '🖥️',
      title: 'Backend Development',
      duration: '12 weeks',
      level: 'intermediate',
      price: 5999,
      desc: 'Master server-side development and APIs',
      topics: ['Node.js', 'Express.js', 'Database design', 'System architecture']
    },
    {
      id: 4,
      icon: '🐍',
      title: 'Python Beginner',
      duration: '6 weeks',
      level: 'beginner',
      price: 2499,
      desc: 'Start your journey with Python programming',
      topics: ['Python basics', 'Data structures', 'Functions', 'Object-oriented programming']
    },
    {
      id: 5,
      icon: '⚙️',
      title: 'C Beginner to Intermediate',
      duration: '8 weeks',
      level: 'beginner',
      price: 2499,
      desc: 'Learn C programming fundamentals',
      topics: ['C basics', 'Memory management', 'Pointers', 'File handling']
    },
    {
      id: 6,
      icon: '⚡',
      title: 'C++',
      duration: '10 weeks',
      level: 'beginner',
      price: 2499,
      desc: 'Master C++ for advanced programming',
      topics: ['C++ basics', 'OOP concepts', 'STL', 'Performance optimization']
    },
    {
      id: 7,
      icon: '☕',
      title: 'Java',
      duration: '10 weeks',
      level: 'beginner',
      price: 2499,
      desc: 'Build robust applications with Java',
      topics: ['Java basics', 'OOP', 'Collections', 'Multithreading']
    },
    {
      id: 8,
      icon: '🗄️',
      title: 'Databases',
      duration: '8 weeks',
      level: 'intermediate',
      price: 2999,
      desc: 'Master database design and management',
      topics: ['SQL', 'Database design', 'Indexing', 'Optimization']
    },
    {
      id: 9,
      icon: '📱',
      title: 'Mobile App Development',
      duration: '12 weeks',
      level: 'intermediate',
      price: 6999,
      desc: 'Build apps for iOS and Android',
      topics: ['React Native', 'Flutter', 'App design', 'Testing & deployment']
    },
  ]

  const features = [
    { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from industry professionals' },
    { icon: '🏆', title: 'Certifications', desc: 'Earn recognized certificates' },
    { icon: '💻', title: 'Hands-on Projects', desc: 'Real-world project experience' },
    { icon: '⏰', title: 'Flexible Schedule', desc: 'Learn at your own pace' },
  ]

  const handleEnroll = (course) => {
    navigate('/enroll', { state: { course } })
  }

  return (
    <div className="space-y-20">
      {/* Premium Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white rounded-2xl px-12 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6">Learning Platform</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Master In-Demand <span className="text-blue-300">Technical Skills</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Industry-leading courses taught by experts. Gain practical knowledge, earn certifications, and advance your tech career with Titanobova.
          </p>
        </div>
      </section>

      {/* Course Features - Enhanced */}
      <section className="py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="card p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Grid - Enhanced */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Available Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from 9 comprehensive courses designed for all skill levels</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card p-8 hover:shadow-2xl hover:border-blue-300 transition transform hover:-translate-y-2 flex flex-col group">
              <div className="text-7xl mb-6 group-hover:scale-110 transition">{course.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{course.desc}</p>
              
              <div className="mb-8 space-y-3 pb-8 border-b-2 border-gray-200">
                <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-700 font-semibold">📅 Duration:</span>
                  <span className="font-bold text-blue-600">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-700 font-semibold">📊 Level:</span>
                  <span className="font-bold text-green-600">{course.level}</span>
                </div>
                <div className="flex items-center justify-between bg-purple-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-700 font-semibold">💰 Price:</span>
                  <span className="font-bold text-purple-600 text-xl">₹{course.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-8 flex-grow">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest text-blue-600">Topics Covered:</h4>
                <ul className="space-y-3">
                  {course.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-center text-gray-700 font-semibold">
                      <span className="text-blue-600 mr-3 text-xl">✓</span> {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleEnroll(course)}
                  className="btn-primary flex-1 py-3 font-bold text-lg rounded-lg hover:shadow-lg transition"
                >
                  🎓 Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Statistics */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Learning Impact</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-6xl font-bold text-blue-400 mb-3">10K+</p>
            <p className="text-gray-300 text-lg">Students Trained</p>
          </div>
          <div className="text-center">
            <p className="text-6xl font-bold text-green-400 mb-3">9</p>
            <p className="text-gray-300 text-lg">Comprehensive Courses</p>
          </div>
          <div className="text-center">
            <p className="text-6xl font-bold text-purple-400 mb-3">98%</p>
            <p className="text-gray-300 text-lg">Completion Rate</p>
          </div>
          <div className="text-center">
            <p className="text-6xl font-bold text-orange-400 mb-3">85%</p>
            <p className="text-gray-300 text-lg">Job Placement</p>
          </div>
        </div>
      </section>

      {/* Why Our Courses - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-16">
        <h2 className="text-5xl font-bold mb-4 text-center text-gray-900">Why Choose Our Courses?</h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">Most comprehensive training with real-world projects and guaranteed support</p>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Curriculum</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Carefully designed by industry experts with strong practical focus and real-world applications.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Industry-vetted content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Hands-on projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Updated regularly</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">🤝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Mentorship</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get direct guidance from seasoned professionals with 10+ years in the industry.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">1-on-1 mentor sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Doubt clearing support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">24/7 availability</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Support</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Comprehensive assistance with job placement and career advancement after completion.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Job placement help</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Resume guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Interview prep</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">What You Get</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete learning package with ongoing support</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-8 text-center border-t-4 border-blue-600">
            <div className="text-5xl mb-4">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Structured Learning</h4>
            <p className="text-gray-600">Week-by-week progression with clear milestones</p>
          </div>
          <div className="card p-8 text-center border-t-4 border-green-600">
            <div className="text-5xl mb-4">🏆</div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Certification</h4>
            <p className="text-gray-600">Industry-recognized certificates upon completion</p>
          </div>
          <div className="card p-8 text-center border-t-4 border-purple-600">
            <div className="text-5xl mb-4">💻</div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Live Projects</h4>
            <p className="text-gray-600">Work on real-world projects with actual code</p>
          </div>
          <div className="card p-8 text-center border-t-4 border-orange-600">
            <div className="text-5xl mb-4">♾️</div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Lifetime Access</h4>
            <p className="text-gray-600">Forever access to course materials and updates</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-center px-8">
        <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
          Join 10,000+ students who have already upskilled with Titanobova. Start your learning journey today!
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <button className="bg-white text-blue-600 px-12 py-4 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
            🎓 Explore All Courses
          </button>
          <button className="border-2 border-white text-white px-12 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
            📞 Book Consultation
          </button>
        </div>
      </section>
    </div>
  )
}
