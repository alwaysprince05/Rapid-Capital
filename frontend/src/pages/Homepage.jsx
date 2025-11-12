import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { BookOpen, Code, TestTube, BarChart3 } from 'lucide-react'

const Homepage = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('home.features.knowledge'),
      description: t('home.features.knowledgeDesc'),
      link: '/knowledge',
      color: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('home.features.docs'),
      description: t('home.features.docsDesc'),
      link: '/docs',
      color: 'bg-green-100 dark:bg-green-900'
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: t('home.features.test'),
      description: t('home.features.testDesc'),
      link: '/test',
      color: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('home.features.admin'),
      description: t('home.features.adminDesc'),
      link: '/admin',
      color: 'bg-orange-100 dark:bg-orange-900'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {t('home.subtitle')}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          {t('home.description')}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          {t('home.features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <p className="mb-6">
          Explore the Knowledge Hub to understand how our AI voice agent works, 
          check the Developer Docs for API integration, test calls in real-time, 
          or manage everything from the Admin Dashboard.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/knowledge"
            className="bg-white text-primary-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            View Knowledge Hub
          </Link>
          <Link
            to="/docs"
            className="bg-white text-primary-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Read Developer Docs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage

