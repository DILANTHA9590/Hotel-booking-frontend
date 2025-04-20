import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <footer class="bg-gray-900 text-white py-10">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
            <div>
              <h2 class="text-2xl font-bold text-yellow-400">Hotelo</h2>
              <p class="text-gray-400 mt-2">
                Your luxury escape starts here 🌴
              </p>
            </div>

            <div class="space-y-2 text-center md:text-left">
              <h3 class="text-lg font-semibold">Quick Links</h3>
              <ul class="text-gray-400">
                <li>
                  <Link to="/" class="hover:text-yellow-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/category" class="hover:text-yellow-400">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/" class="hover:text-yellow-400">
                    Book Now
                  </Link>
                </li>
                <li>
                  <Link to="/contact" class="hover:text-yellow-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div class="text-center md:text-left">
              <h3 class="text-lg font-semibold">Contact Us</h3>
              <p class="text-gray-400">📍 123 Beachside Ave, Colombo</p>
              <p class="text-gray-400">📞 +94 77 123 4567</p>
              <p class="text-gray-400">✉️ hello@hotelo.com</p>
            </div>
          </div>

          <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
            © 2025 Hotelo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
