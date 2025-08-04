import { MultiSelect } from './components/multi-select/MultiSelect'

function App() {

  const items = [
    { label: "Education", value: "education", icon: "🎓" },
    { label: "Science", value: "science", icon: "🧪" },
    { label: "Art", value: "art", icon: "🎨" },
    { label: "Sport", value: "sport", icon: "⚽" },
    { label: "Games", value: "games", icon: "🎮" },
    { label: "Health", value: "health", icon: "🏥" },
    { label: "Technology", value: "technology", icon: "💻" },
    { label: "Business", value: "business", icon: "💼" },
    { label: "Music", value: "music", icon: "🎵" },
    { label: "Movies", value: "movies", icon: "🎬" },
    { label: "Travel", value: "travel", icon: "✈️" },
  ];

  return (
    <>
      <MultiSelect items={items} />
    </>
  )
}

export default App
