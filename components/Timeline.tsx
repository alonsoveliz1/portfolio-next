'use client'

import { motion } from 'framer-motion'
import { timelineEntries } from '@/lib/config'

export default function Timeline() {
	return (
		<div className="relative pl-8">
			{/* Vertical line */}
			<div className="absolute left-[6px] top-2 bottom-2 w-0.5 bg-bg-code" />

			{timelineEntries.map((entry, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, x: -12 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
					className="relative pb-8 last:pb-0"
				>
					{/* Dot */}
					<motion.div
						initial={{ scale: 0 }}
						whileInView={{ scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.3, delay: i * 0.1 + 0.1 }}
						className={`absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent2 ${i === 0 ? 'bg-accent2' : 'bg-bg'
							}`}
					/>

					<div className="font-display text-sm text-accent2 mb-1" style={{ letterSpacing: '0.05em' }}>{entry.date}</div>
					<h3 className="font-display text-lg text-title mb-1" style={{ letterSpacing: '0.05em' }}>{entry.title}</h3>
					<p className="text-muted text-sm leading-relaxed">{entry.description}</p>
				</motion.div>
			))}
		</div>
	)
}
