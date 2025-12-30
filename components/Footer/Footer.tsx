import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ocheretko Oleh!</p>
          <p className={css.positionP}>
            Contact us:
            <a
              href="https://www.linkedin.com/in/ocheretko-oleh"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/ocheretko-oleh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
