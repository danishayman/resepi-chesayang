"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { titleToSlug } from '@/lib/utils'
import type { Recipe } from '@/lib/types'

export default function RandomButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const pickRandom = async () => {
        try {
            setLoading(true)

            // Fetch minimal fields to keep payload small. We rely on title -> slug fallback
            const { data, error } = await supabase
                .from('recipes')
                .select('id, title, thumbnail_url')

            if (error) throw error
            if (!data || data.length === 0) return

            const idx = Math.floor(Math.random() * data.length)
            const recipe = data[idx] as Partial<Pick<Recipe, 'id' | 'title' | 'thumbnail_url'>>

            // Generate slug from the title (the DB schema doesn't include a slug column in types)
            const slug = titleToSlug(recipe?.title ?? '')

            // Navigate to the recipe page
            router.push(`/resepi/${slug}`)
        } catch (err) {
            console.error('Randomize error', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={pickRandom}
            className="mt-4 px-5 py-2.5 bg-[var(--accent-pink)] hover:bg-[#e60078] text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-pink)] disabled:opacity-60 text-sm md:text-sm"
            aria-label="Tak tahu nak masak apa?"
            disabled={loading}
        >
            {loading ? 'Mencari...' : 'Tak tahu nak masak apa?'}
        </button>
    )
}
