export function sticky() {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bottomHeader = document.querySelector(".bottom-header");
      if (bottomHeader) {
        let stickyOffset = 90;

        if (window.innerWidth <= 768) {
          stickyOffset = 75;
        }
        setIsSticky(window.pageYOffset > stickyOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
