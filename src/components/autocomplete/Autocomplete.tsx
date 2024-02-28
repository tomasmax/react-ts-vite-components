import { ChangeEvent, ReactElement, useState } from "react";
import "./index.css";

interface AutocompleteProps {
  suggestions: string[];
  placeholder: string;
  onSelect: (suggestion: string) => void;
}

const Autocomplete = ({
  suggestions,
  placeholder = "Type to search",
  onSelect,
}: AutocompleteProps): ReactElement => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [matchedChars, setMatchedChars] = useState<(string | null)[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const matchingChars = (value: string) =>
    value.split("").map((char, index) => {
      const optionChars =
        filteredSuggestions[0] && filteredSuggestions[0].split("");
      return optionChars && optionChars[index] === char ? char : null;
    });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const matchedChars = matchingChars(inputValue);
    const newFilteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(newFilteredSuggestions);
    setMatchedChars(matchedChars);
    setIsOpen(true);
  };

  const handleClickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onSelect(suggestion);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`suggestion-${index}`}
              className="suggestion"
              onClick={() => handleClickSuggestion(suggestion)}
            >
              {suggestion.split("").map((char, index) => (
                <span
                  key={`suggestion-char-${index}`}
                  className={matchedChars?.[index] ? "highlighted-char" : ""}
                >
                  {char}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
