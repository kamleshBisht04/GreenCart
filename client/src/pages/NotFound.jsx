/* eslint-disable react-hooks/purity */
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

export default function NotFound() {
  // Subtle floating dots (no emojis, clean UI)
  const dots = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 8 + Math.random() * 5,
      delay: Math.random() * 3,
      size: 3 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      {/* Soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50" />

      {/* Floating subtle dots */}
      <div className="pointer-events-none absolute inset-0">
        {dots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-green-200 opacity-40"
            style={{ width: d.size, height: d.size }}
            initial={{ y: '100vh', x: d.x + 'vw' }}
            animate={{ y: '-10vh' }}
            transition={{
              duration: d.duration,
              repeat: Infinity,
              delay: d.delay,
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-md text-center">
        {/* Clean 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-semibold text-gray-900"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-xl font-medium text-gray-700"
        >
          Page not found
        </motion.h2>

        <p className="mt-3 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-md bg-green-600 px-5 py-2 text-white shadow-sm hover:bg-green-700"
            >
              Go Home
            </motion.button>
          </Link>

          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-md border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-50"
            >
              Browse Products
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
