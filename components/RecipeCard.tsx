import Image from 'next/image'
import Link from 'next/link'
import { Recipe } from '@/lib/types'
import { titleToSlug, formatTime, getThumbnailUrl } from '@/lib/utils'

interface RecipeCardProps {
  recipe: Recipe
  onTagClick?: (tag: string) => void
  selectedTags?: string[]
}

export default function RecipeCard({ recipe, onTagClick, selectedTags = [] }: RecipeCardProps) {
  const slug = titleToSlug(recipe.title)
  const thumbnailUrl = getThumbnailUrl(recipe.thumbnail_url)

  const hasActiveTag = selectedTags.length > 0 && (recipe.tags || []).some(t => selectedTags.includes(t))

  return (
    <Link href={`/resepi/${slug}`} className="group block w-80 h-96 mx-auto">
  <div className={`rounded-lg shadow-sm border overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col ${hasActiveTag ? 'bg-slate-700 border-slate-600 ring-2 ring-blue-500/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
        <div className="h-70 relative overflow-hidden flex-shrink-0">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {recipe.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-4">
              {recipe.total_time_minutes && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(recipe.total_time_minutes)}
                </span>
              )}
              
              {recipe.servings && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {recipe.servings}
                </span>
              )}
            </div>
            
            {recipe.difficulty_level && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                recipe.difficulty_level.toLowerCase() === 'mudah' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : recipe.difficulty_level.toLowerCase() === 'sederhana'
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {recipe.difficulty_level}
              </span>
            )}
          </div>
          
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map((tag, index) => {
                const isActive = selectedTags.includes(tag)
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      // prevent the outer Link navigation
                      e.preventDefault()
                      e.stopPropagation()
                      // call onTagClick if provided
                      onTagClick?.(tag)
                    }}
                    aria-pressed={isActive}
                    className={`inline-block px-2 py-1 text-xs rounded-full transition-colors transform-gpu active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    #{tag}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
