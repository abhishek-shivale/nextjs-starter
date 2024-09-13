import Form from "./form";


export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="absolute inset-x-0 top-[5px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"></rect>
        </svg>
      </div>
     <Form />
    </div>
  );
}

