import { SkillCategory, TechItem } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Next.js', icon: '▲', color: '#000000', proficiency: 90 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 92 },
      { name: 'Three.js', icon: '🎮', color: '#049EF4', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
      { name: 'Framer Motion', icon: '🎭', color: '#FF0080', proficiency: 88 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 88 },
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 85 },
      { name: 'GraphQL', icon: '◈', color: '#E10098', proficiency: 82 },
      { name: 'REST APIs', icon: '🔌', color: '#FF6C37', proficiency: 90 },
      { name: 'Express', icon: '⚡', color: '#000000', proficiency: 87 },
      { name: 'FastAPI', icon: '🚀', color: '#009688', proficiency: 80 },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', proficiency: 85 },
      { name: 'MongoDB', icon: '🍃', color: '#47A248', proficiency: 82 },
      { name: 'Redis', icon: '📮', color: '#DC382D', proficiency: 78 },
      { name: 'Prisma', icon: '◭', color: '#2D3748', proficiency: 86 },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', icon: '🐳', color: '#2496ED', proficiency: 83 },
      { name: 'AWS', icon: '☁️', color: '#FF9900', proficiency: 80 },
      { name: 'CI/CD', icon: '🔄', color: '#2088F2', proficiency: 85 },
      { name: 'Vercel', icon: '▲', color: '#000000', proficiency: 90 },
    ],
  },
  {
    name: '3D Graphics',
    skills: [
      { name: 'WebGL', icon: '🎯', color: '#990000', proficiency: 82 },
      { name: 'GLSL', icon: '✨', color: '#5686F5', proficiency: 75 },
      { name: 'Blender', icon: '🔶', color: '#F5792A', proficiency: 70 },
      {
        name: 'React Three Fiber',
        icon: '🌐',
        color: '#61DAFB',
        proficiency: 88,
      },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: '📦', color: '#F05032', proficiency: 92 },
      { name: 'VS Code', icon: '💻', color: '#007ACC', proficiency: 95 },
      { name: 'Figma', icon: '🎨', color: '#F24E1E', proficiency: 80 },
      { name: 'Postman', icon: '📬', color: '#FF6C37', proficiency: 88 },
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
    id: 'three-shader',
    title: 'GLSL Shader',
    language: 'glsl',
    code: `varying vec2 vUv;
varying float vDistortion;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseStrength;

void main() {
  vUv = uv;
  
  vec3 pos = position;
  float dist = distance(uv, vec2(0.5));
  
  pos.z += sin(dist * 10.0 + uTime * uSpeed) * uNoiseStrength;
  vDistortion = pos.z;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,
  },
  {
    id: 'python-algo',
    title: 'Algorithm Implementation',
    language: 'python',
    code: `def quicksort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Time: O(n log n) average | Space: O(log n)`,
  },
];
