import { MultiSelectDropDwon } from './components/multi-select/components/multi-select-drop-down/MultiSelectDropDwon'

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
      <MultiSelectDropDwon
        items={items}
        placeholder='Select or add items...'
      />
    </>
  )
}

export default App
