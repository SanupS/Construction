export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  plan?: string
  message: string
  createdAt: string
}

const planLabels: Record<string, string> = {
  'horizon-villa': 'Horizon Villa',
  'evergreen-estate': 'Evergreen Estate',
  'skyline-penthouse': 'Skyline Penthouse',
  'cottage-comfort': 'Cottage Comfort',
  'aurora-modern': 'Aurora Modern',
  'heritage-manor': 'Heritage Manor',
  custom: 'Custom Design',
}

export function formatPlan(plan?: string) {
  if (!plan) return 'Not specified'
  return planLabels[plan] || plan
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export { formatDate }
