const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-4 bg-gray-100 text-center text-sm text-gray-600">
      &copy; {year} Users Management Dashboard. All rights reserved.
    </footer>
  );
};

export default Footer;
