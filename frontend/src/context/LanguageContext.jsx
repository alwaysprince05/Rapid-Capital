import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const translations = {
    en: {
      nav: {
        home: 'Home',
        knowledge: 'Knowledge Hub',
        docs: 'Developer Docs',
        test: 'Live Test',
        admin: 'Admin Dashboard'
      },
      home: {
        title: 'Rapid Capital Knowledge & Voice Platform',
        subtitle: 'AI-Powered Voice Agent for Customer Support',
        description: 'This platform serves as a knowledge center for Rapid Capital\'s AI voice calling agent, integrated with Retell.ai and n8n workflow automation.',
        features: {
          title: 'Key Features',
          knowledge: 'Knowledge Hub',
          knowledgeDesc: 'Comprehensive documentation and guides',
          docs: 'Developer Documentation',
          docsDesc: 'API references and integration guides',
          test: 'Live Testing',
          testDesc: 'Test voice calls in real-time',
          admin: 'Admin Dashboard',
          adminDesc: 'Manage calls and monitor performance'
        }
      },
      knowledge: {
        title: 'Knowledge Hub',
        overview: 'Overview',
        setup: 'Setup Guide',
        prompts: 'Prompt Templates',
        webhooks: 'Webhook Examples'
      },
      docs: {
        title: 'Developer Documentation',
        apis: 'API Endpoints',
        examples: 'Example Payloads'
      },
      test: {
        title: 'Live Test',
        startCall: 'Start Test Call',
        transcript: 'Conversation Transcript'
      },
      admin: {
        title: 'Admin Dashboard',
        calls: 'Call Logs',
        status: 'Status',
        actions: 'Actions'
      }
    },
    hi: {
      nav: {
        home: 'होम',
        knowledge: 'ज्ञान केंद्र',
        docs: 'डेवलपर दस्तावेज़',
        test: 'लाइव टेस्ट',
        admin: 'एडमिन डैशबोर्ड'
      },
      home: {
        title: 'रैपिड कैपिटल ज्ञान और वॉइस प्लेटफॉर्म',
        subtitle: 'ग्राहक सहायता के लिए AI-संचालित वॉइस एजेंट',
        description: 'यह प्लेटफॉर्म रैपिड कैपिटल के AI वॉइस कॉलिंग एजेंट के लिए एक ज्ञान केंद्र के रूप में कार्य करता है, जो Retell.ai और n8n वर्कफ़्लो ऑटोमेशन के साथ एकीकृत है।',
        features: {
          title: 'मुख्य विशेषताएं',
          knowledge: 'ज्ञान केंद्र',
          knowledgeDesc: 'व्यापक दस्तावेज़ीकरण और गाइड',
          docs: 'डेवलपर दस्तावेज़ीकरण',
          docsDesc: 'API संदर्भ और एकीकरण गाइड',
          test: 'लाइव टेस्टिंग',
          testDesc: 'वास्तविक समय में वॉइस कॉल का परीक्षण करें',
          admin: 'एडमिन डैशबोर्ड',
          adminDesc: 'कॉल प्रबंधित करें और प्रदर्शन की निगरानी करें'
        }
      },
      knowledge: {
        title: 'ज्ञान केंद्र',
        overview: 'अवलोकन',
        setup: 'सेटअप गाइड',
        prompts: 'प्रॉम्प्ट टेम्प्लेट',
        webhooks: 'वेबहुक उदाहरण'
      },
      docs: {
        title: 'डेवलपर दस्तावेज़ीकरण',
        apis: 'API एंडपॉइंट्स',
        examples: 'उदाहरण पेलोड'
      },
      test: {
        title: 'लाइव टेस्ट',
        startCall: 'टेस्ट कॉल शुरू करें',
        transcript: 'बातचीत ट्रांसक्रिप्ट'
      },
      admin: {
        title: 'एडमिन डैशबोर्ड',
        calls: 'कॉल लॉग',
        status: 'स्थिति',
        actions: 'कार्रवाई'
      }
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

