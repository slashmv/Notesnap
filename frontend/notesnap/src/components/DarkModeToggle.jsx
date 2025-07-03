import { useRef } from "react";
import { flushSync } from "react-dom";
import "../styles/DarkModeToggle.css";

function DarkModeToggle({ darkMode, setDarkMode }) {
  const ref = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode((curr) => {
      const newDarkModeVal = !curr;
      localStorage.setItem("darkMode", newDarkModeVal);
      return newDarkModeVal;
    });
  };

  const onThemeSwitchChange = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      toggleDarkMode();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleDarkMode();
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 1500,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <div id="dm-switch">
      <label className="switch">
        <input
          className="switch__input"
          type="checkbox"
          role="switch"
          onClick={onThemeSwitchChange}
          ref={ref}
          defaultChecked={darkMode}
          data-testid="dark-mode-toggle-btn"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        />
        <svg
          className="switch__icon switch__icon--light"
          viewBox="0 0 12 12"
          width="12px"
          height="12px"
          aria-hidden="true"
        >
          <g fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round">
            <circle cx="6" cy="6" r="2" />
            <g strokeDasharray="1.5 1.5">
              <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
              <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
            </g>
          </g>
        </svg>
        <svg
          className="switch__icon switch__icon--dark"
          viewBox="0 0 12 12"
          width="12px"
          height="12px"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#fff"
            strokeWidth="1"
            strokeLinejoin="round"
            transform="rotate(-45,6,6)"
          >
            <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
          </g>
        </svg>
      </label>
    </div>
  );
}

export default DarkModeToggle;
