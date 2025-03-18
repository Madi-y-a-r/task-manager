export default function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        </div>
      </footer>
    );
  }