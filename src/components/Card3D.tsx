import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Card3DProps {
  children: ReactNode
  className?: string
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={ref} className={`perspective-1000 ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}
