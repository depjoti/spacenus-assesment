// src/components/ColorPicker/ColorPicker.tsx
import { useState, useRef, useEffect } from "react"
import styles from "./ColorPicker.module.scss"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(color)
  const pickerRef = useRef<HTMLDivElement>(null)

  const predefinedColors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8800",
    "#88ff00",
    "#0088ff",
    "#ff0088",
    "#8800ff",
    "#00ff88",
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    setInputValue(selectedColor)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(value)
    }
  }

  return (
    <div className={styles.colorPicker} ref={pickerRef}>
      <div
        className={styles.colorPreview}
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.colorInput}
      />
      {isOpen && (
        <div className={styles.colorPalette}>
          {predefinedColors.map((presetColor) => (
            <div
              key={presetColor}
              className={styles.colorOption}
              style={{ backgroundColor: presetColor }}
              onClick={() => handleColorSelect(presetColor)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
