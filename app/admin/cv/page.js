'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Download, Eye, Plus, Trash2, Edit3, Check } from 'lucide-react'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin/admin-layout'

// Tab Components
function PersonalInfoTab({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Full Stack Developer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="New York, NY"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://johndoe.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write a compelling summary of your professional background, skills, and career objectives..."
        />
      </div>
    </div>
  )
}

function SkillsTab({ formData, handleInputChange, handleNestedInputChange, addArrayItem, removeArrayItem }) {
  const [newSkill, setNewSkill] = useState('')
  const [newSkillLevel, setNewSkillLevel] = useState('intermediate')
  const [selectedCategory, setSelectedCategory] = useState('frontend')
  const [editingSkill, setEditingSkill] = useState(null)

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-gray-500', width: '25%' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', width: '50%' },
    { value: 'advanced', label: 'Advanced', color: 'bg-blue-500', width: '75%' },
    { value: 'expert', label: 'Expert', color: 'bg-green-500', width: '100%' }
  ]

  const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    tools: '🛠️',
    languages: '💻'
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      const skillData = {
        name: newSkill.trim(),
        level: newSkillLevel,
        category: selectedCategory
      }
      
      addArrayItem('technicalSkills', {
        ...formData.technicalSkills,
        [selectedCategory]: [...(formData.technicalSkills[selectedCategory] || []), skillData]
      })
      setNewSkill('')
      setNewSkillLevel('intermediate')
      toast.success(`${newSkill.trim()} added to ${selectedCategory} skills`)
    }
  }

  const removeSkill = (category, index) => {
    const updatedSkills = { ...formData.technicalSkills }
    updatedSkills[category] = updatedSkills[category].filter((_, i) => i !== index)
    handleInputChange('technicalSkills', updatedSkills)
  }

  const updateSkillLevel = (category, index, newLevel) => {
    const updatedSkills = { ...formData.technicalSkills }
    updatedSkills[category] = updatedSkills[category].map((skill, i) => 
      i === index ? { ...skill, level: newLevel } : skill
    )
    handleInputChange('technicalSkills', updatedSkills)
  }

  const addSoftSkill = () => {
    if (newSkill.trim()) {
      addArrayItem('softSkills', newSkill.trim())
      setNewSkill('')
      toast.success(`${newSkill.trim()} added to soft skills`)
    }
  }

  const getSkillLevelInfo = (level) => {
    return skillLevels.find(l => l.value === level) || skillLevels[1]
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h3>
        <p className="text-gray-600">Showcase your technical and soft skills with proficiency levels</p>
      </div>
      
      {/* Technical Skills */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">💻</span>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Technical Skills</h4>
            <p className="text-sm text-gray-600">Programming languages, frameworks, and tools</p>
          </div>
        </div>
        
        {/* Add new skill */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Add New Technical Skill</h5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="frontend">🎨 Frontend</option>
              <option value="backend">⚙️ Backend</option>
              <option value="tools">🛠️ Tools & Technologies</option>
              <option value="languages">💻 Programming Languages</option>
            </select>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill name (e.g., React, Python)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {skillLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Display skills by category */}
        {['frontend', 'backend', 'tools', 'languages'].map(category => {
          const skills = formData.technicalSkills[category] || []
          if (skills.length === 0) return null
          
          return (
            <div key={category} className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{categoryIcons[category]}</span>
                <h5 className="text-lg font-semibold text-gray-900 capitalize">{category}</h5>
                <span className="text-sm text-gray-500">({skills.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const levelInfo = getSkillLevelInfo(skill.level || 'intermediate')
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h6 className="font-medium text-gray-900">{skill.name || skill}</h6>
                          <p className="text-sm text-gray-600">{levelInfo.label}</p>
                        </div>
                        <button
                          onClick={() => removeSkill(category, index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Skill Level Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Proficiency</span>
                          <span>{levelInfo.label}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${levelInfo.color}`}
                            style={{ width: levelInfo.width }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Level Selector */}
                      <div className="mt-3">
                        <select
                          value={skill.level || 'intermediate'}
                          onChange={(e) => updateSkillLevel(category, index, e.target.value)}
                          className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {skillLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Soft Skills */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🤝</span>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Soft Skills</h4>
            <p className="text-sm text-gray-600">Personal attributes and interpersonal abilities</p>
          </div>
        </div>
        
        {/* Add soft skill */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Add New Soft Skill</h5>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Soft skill (e.g., Leadership, Communication)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <button
              onClick={addSoftSkill}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Display soft skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {formData.softSkills.map((skill, index) => (
            <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
              <span className="font-medium text-green-800">{skill}</span>
              <button
                onClick={() => removeArrayItem('softSkills', index)}
                className="text-green-600 hover:text-green-800 p-1"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        
        {formData.softSkills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🤝</div>
            <p>No soft skills added yet. Add your interpersonal skills above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    achievements: []
  })
  const [newAchievement, setNewAchievement] = useState('')

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      addArrayItem('experience', { ...newExperience })
      setNewExperience({
        title: '',
        company: '',
        period: '',
        description: '',
        achievements: []
      })
      toast.success(`${newExperience.title} at ${newExperience.company} added`)
    }
  }

  const editExperience = (index) => {
    setEditingIndex(index)
    setNewExperience({ ...formData.experience[index] })
  }

  const updateExperience = () => {
    if (editingIndex >= 0) {
      updateArrayItem('experience', editingIndex, { ...newExperience })
      setEditingIndex(-1)
      setNewExperience({
        title: '',
        company: '',
        period: '',
        description: '',
        achievements: []
      })
    }
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (index) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
      
      {/* Add/Edit Experience Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Experience' : 'Add New Experience'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              value={newExperience.title}
              onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Senior Developer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tech Corp"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <input
              type="text"
              value={newExperience.period}
              onChange={(e) => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2022 - Present"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your role and responsibilities..."
          />
        </div>
        
        {/* Achievements */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add achievement"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
            />
            <button
              onClick={addAchievement}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white rounded border">
                <span className="flex-1 text-sm">{achievement}</span>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateExperience}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewExperience({
                    title: '',
                    company: '',
                    period: '',
                    description: '',
                    achievements: []
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          )}
        </div>
      </div>
      
      {/* Experience List */}
      <div className="space-y-4">
        {formData.experience.map((exp, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{exp.title}</h5>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editExperience(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('experience', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {exp.description && (
              <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
            )}
            
            {exp.achievements && exp.achievements.length > 0 && (
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Key Achievements:</h6>
                <ul className="text-sm text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        
        {formData.experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No experience added yet. Add your first work experience above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newEducation, setNewEducation] = useState({
    degree: '',
    school: '',
    year: '',
    description: ''
  })

  const addEducation = () => {
    if (newEducation.degree && newEducation.school) {
      addArrayItem('education', { ...newEducation })
      setNewEducation({
        degree: '',
        school: '',
        year: '',
        description: ''
      })
      toast.success(`${newEducation.degree} at ${newEducation.school} added`)
    }
  }

  const editEducation = (index) => {
    setEditingIndex(index)
    setNewEducation({ ...formData.education[index] })
  }

  const updateEducation = () => {
    if (editingIndex >= 0) {
      updateArrayItem('education', editingIndex, { ...newEducation })
      setEditingIndex(-1)
      setNewEducation({
        degree: '',
        school: '',
        year: '',
        description: ''
      })
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Education</h3>
      
      {/* Add/Edit Education Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Education' : 'Add New Education'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School/University *</label>
            <input
              type="text"
              value={newEducation.school}
              onChange={(e) => setNewEducation(prev => ({ ...prev, school: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="University of Technology"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year/Graduation</label>
            <input
              type="text"
              value={newEducation.year}
              onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2018 - 2022"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newEducation.description}
            onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Relevant coursework, honors, GPA, etc."
          />
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateEducation}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewEducation({
                    degree: '',
                    school: '',
                    year: '',
                    description: ''
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addEducation}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </button>
          )}
        </div>
      </div>
      
      {/* Education List */}
      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editEducation(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('education', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {edu.description && (
              <p className="text-sm text-gray-700">{edu.description}</p>
            )}
          </div>
        ))}
        
        {formData.education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet. Add your educational background above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: [],
    link: ''
  })
  const [newTechnology, setNewTechnology] = useState('')

  const addProject = () => {
    if (newProject.name && newProject.description) {
      addArrayItem('projects', { ...newProject })
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: ''
      })
      toast.success(`${newProject.name} project added`)
    }
  }

  const editProject = (index) => {
    setEditingIndex(index)
    setNewProject({ ...formData.projects[index] })
  }

  const updateProject = () => {
    if (editingIndex >= 0) {
      updateArrayItem('projects', editingIndex, { ...newProject })
      setEditingIndex(-1)
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: ''
      })
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const removeTechnology = (index) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
      
      {/* Add/Edit Project Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Project' : 'Add New Project'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E-commerce Platform"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
            <input
              type="url"
              value={newProject.link}
              onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your project, its features, and impact..."
          />
        </div>
        
        {/* Technologies */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add technology"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
            />
            <button
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {newProject.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
                <button
                  onClick={() => removeTechnology(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateProject}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewProject({
                    name: '',
                    description: '',
                    technologies: [],
                    link: ''
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addProject}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          )}
        </div>
      </div>
      
      {/* Projects List */}
      <div className="space-y-4">
        {formData.projects.map((project, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{project.name}</h5>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Project →
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editProject(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('projects', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{project.description}</p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {formData.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet. Add your key projects above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AdditionalTab({ formData, handleInputChange, addArrayItem, removeArrayItem, updateArrayItem }) {
  return <div>Additional Tab - Coming Soon</div>
}

function SettingsTab({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">CV Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template Style</label>
          <select
            value={formData.template}
            onChange={(e) => handleInputChange('template', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        
        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
          <select
            value={formData.colorScheme}
            onChange={(e) => handleInputChange('colorScheme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>
            <option value="gray">Gray</option>
          </select>
        </div>
        
        {/* Layout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
          <select
            value={formData.layout}
            onChange={(e) => handleInputChange('layout', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="single">Single Column</option>
            <option value="two-column">Two Column</option>
          </select>
        </div>
        
        {/* Photo Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo Settings</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.showPhoto}
                onChange={(e) => handleInputChange('showPhoto', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Include photo in CV</span>
            </label>
            {formData.showPhoto && (
              <input
                type="url"
                value={formData.photoUrl}
                onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                placeholder="Photo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Template Preview</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className={`h-16 rounded-lg mb-4 ${
            formData.colorScheme === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-800' :
            formData.colorScheme === 'green' ? 'bg-gradient-to-r from-green-600 to-green-800' :
            formData.colorScheme === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-800' :
            formData.colorScheme === 'red' ? 'bg-gradient-to-r from-red-600 to-red-800' :
            'bg-gradient-to-r from-gray-600 to-gray-800'
          }`}>
            <div className="h-full flex items-center px-4">
              <div className="text-white">
                <div className="font-bold text-lg">{formData.fullName || 'Your Name'}</div>
                <div className="text-sm opacity-90">{formData.title || 'Your Title'}</div>
              </div>
            </div>
          </div>
          
          <div className={`grid gap-4 ${formData.layout === 'two-column' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CVManagement() {
  const [cvData, setCvData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    
    // Skills
    technicalSkills: {
      frontend: [],
      backend: [],
      tools: [],
      languages: []
    },
    softSkills: [],
    
    // Experience
    experience: [],
    
    // Education
    education: [],
    
    // Projects
    projects: [],
    
    // Certifications
    certifications: [],
    
    // Languages
    languages: [],
    
    // Additional Info
    additionalInfo: {
      interests: [],
      volunteer: [],
      publications: []
    },
    
    // Settings
    template: 'modern',
    colorScheme: 'blue',
    layout: 'single',
    showPhoto: false,
    photoUrl: ''
  })

  // Fetch CV data
  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch('/api/admin/cv')
        const data = await response.json()
        
        if (data.cv) {
          setCvData(data.cv)
          setFormData({
            fullName: data.cv.fullName || '',
            title: data.cv.title || '',
            email: data.cv.email || '',
            phone: data.cv.phone || '',
            location: data.cv.location || '',
            website: data.cv.website || '',
            linkedin: data.cv.linkedin || '',
            github: data.cv.github || '',
            summary: data.cv.summary || '',
            technicalSkills: data.cv.technicalSkills || { frontend: [], backend: [], tools: [], languages: [] },
            softSkills: data.cv.softSkills || [],
            experience: data.cv.experience || [],
            education: data.cv.education || [],
            projects: data.cv.projects || [],
            certifications: data.cv.certifications || [],
            languages: data.cv.languages || [],
            additionalInfo: data.cv.additionalInfo || { interests: [], volunteer: [], publications: [] },
            template: data.cv.template || 'modern',
            colorScheme: data.cv.colorScheme || 'blue',
            layout: data.cv.layout || 'single',
            showPhoto: data.cv.showPhoto || false,
            photoUrl: data.cv.photoUrl || ''
          })
          toast.success('CV data loaded successfully!')
        }
      } catch (error) {
        console.error('Error fetching CV data:', error)
        toast.error('Failed to load CV data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchCVData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setCvData(data.cv)
        toast.success('CV saved successfully!')
      } else {
        toast.error('Failed to save CV. Please try again.')
      }
    } catch (error) {
      console.error('Error saving CV:', error)
      toast.error('Error saving CV. Please check your connection.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }))
  }

  const addArrayItem = (field, newItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (field, index, updatedItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? updatedItem : item)
    }))
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading CV data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CV Management</h1>
              <p className="text-gray-600 mt-1">Create and manage your professional CV</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Saving...' : 'Save CV'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'personal', label: 'Personal Info' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'experience', label: 'Experience' },
                    { id: 'education', label: 'Education' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'additional', label: 'Additional' },
                    { id: 'settings', label: 'Settings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <PersonalInfoTab 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillsTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    handleNestedInputChange={handleNestedInputChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                  />
                )}
                {activeTab === 'experience' && (
                  <ExperienceTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'education' && (
                  <EducationTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'projects' && (
                  <ProjectsTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'additional' && (
                  <AdditionalTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'settings' && (
                  <SettingsTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            {showPreview && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Preview</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{formData.fullName || 'Your Name'}</h4>
                    <p className="text-sm text-gray-600">{formData.title || 'Your Title'}</p>
                    <p className="text-sm text-gray-500">{formData.email || 'your@email.com'}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {formData.summary || 'Your professional summary will appear here...'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Experience</h5>
                    <div className="space-y-2">
                      {formData.experience.slice(0, 2).map((exp, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-gray-900">{exp.title || 'Job Title'}</p>
                          <p className="text-gray-600">{exp.company || 'Company'}</p>
                        </div>
                      ))}
                      {formData.experience.length === 0 && (
                        <p className="text-sm text-gray-500">No experience added yet</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <a
                    href="/api/cv/download"
                    target="_blank"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  )
}
