import { useState } from 'react';
import { MultiSelectDropDwon } from './components/multi-select/components/multi-select-drop-down/MultiSelectDropDwon'
import type { IOption } from './components/multi-select/libraries/multi-select-types';

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

  const [selected, setSelected] = useState<IOption[]>([]);



  return (
    <>
      <MultiSelectDropDwon
        items={items}
        placeholder='Select or add items...'
        onChange={(newValue) => setSelected(newValue)}
        value={selected}
      />
    </>
  )
}

export default App
