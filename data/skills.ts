import { SkillCategory, TechItem } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', proficiency: 92 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 88 },
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 90 },
      { name: 'Angular', icon: '🅰️', color: '#DD0031', proficiency: 85 },
      { name: 'Redux', icon: '🔄', color: '#764ABC', proficiency: 82 },
      { name: 'HTML/CSS', icon: '🎨', color: '#E34C26', proficiency: 95 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 88 },
      { name: 'Express.js', icon: '⚡', color: '#000000', proficiency: 85 },
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 82 },
      { name: 'GraphQL', icon: '◈', color: '#E10098', proficiency: 78 },
      { name: 'REST APIs', icon: '🔌', color: '#FF6C37', proficiency: 90 },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', proficiency: 82 },
      { name: 'MongoDB', icon: '🍃', color: '#47A248', proficiency: 85 },
      { name: 'MySQL', icon: '🐬', color: '#4479A1', proficiency: 88 },
      { name: 'SQL', icon: '🗄️', color: '#336791', proficiency: 90 },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', icon: '🐳', color: '#2496ED', proficiency: 78 },
      { name: 'Git', icon: '📦', color: '#F05032', proficiency: 92 },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28', proficiency: 80 },
      { name: 'Heroku', icon: '☁️', color: '#430098', proficiency: 75 },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Agile/Scrum', icon: '🔄', color: '#41B883', proficiency: 90 },
      { name: 'SAP', icon: '💼', color: '#0FAAFF', proficiency: 85 },
      { name: 'Bootstrap', icon: '🎨', color: '#7952B3', proficiency: 88 },
      { name: 'Power BI', icon: '📊', color: '#F2C811', proficiency: 82 },
      { name: 'Tableau', icon: '📈', color: '#E97627', proficiency: 78 },
    ],
  },
];

export const codeSnippets = [
  {
    id: 'react-hook',
    title: 'Custom React Hook',
    language: 'typescript',
    code: `export function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}`,
  },
  {
    id: 'express-api',
    title: 'Express API Endpoint',
    language: 'javascript',
    code: `app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.create({
      name,
      email,
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});`,
  },
  {
    id: 'python-data',
    title: 'Data Processing',
    language: 'python',
    code: `def process_data(df):
    # Clean and transform data
    df = df.dropna()
    df['date'] = pd.to_datetime(df['date'])
    
    # Calculate metrics
    metrics = {
        'total': len(df),
        'average': df['value'].mean(),
        'trend': df.groupby('date')['value'].sum()
    }
    
    return metrics

# Usage
results = process_data(sales_data)
print(f"Processed {results['total']} records")`,
  },
  {
    id: 'sql-analytics',
    title: 'Analytics Query',
    language: 'sql',
    code: `WITH monthly_metrics AS (
  SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(DISTINCT user_id) as active_users,
    SUM(revenue) as total_revenue,
    AVG(session_duration) as avg_duration
  FROM user_activity
  WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY 1
)
SELECT 
  month,
  active_users,
  total_revenue,
  ROUND(total_revenue / active_users, 2) as revenue_per_user,
  LAG(total_revenue, 1) OVER (ORDER BY month) as prev_revenue,
  ROUND(((total_revenue - LAG(total_revenue, 1) OVER (ORDER BY month)) 
    / LAG(total_revenue, 1) OVER (ORDER BY month) * 100), 2) as growth_rate
FROM monthly_metrics
ORDER BY month DESC;`,
  },
];
