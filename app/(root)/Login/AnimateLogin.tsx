"use client";
import { motion } from "framer-motion";
const AnimationLogin = () => {
  return (
    <div className='text-center lg:text-left'>
      <div>
        <motion.h2
          className='text-5xl font-bold'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Login to
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.h2
            className='text-5xl font-bold'
            initial={{ opacity: 1, y: 5 }}
            animate={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 7 }}
          >
            view
          </motion.h2>
        </motion.div>
        <motion.h2
          className='text-5xl font-bold text-accent'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -40 }}
          transition={{ duration: 0.8, delay: 8 }}
        >
          QuiL
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        <motion.h1
          className='text-5xl font-bold'
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
        >
          Databases
        </motion.h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -90 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 2.5,
        }}
      >
        <motion.h1
          className='text-5xl font-bold'
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 4.5,
          }}
        >
          Schemas
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -140 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 5,
        }}
      >
        <motion.h1
          className='text-5xl font-bold'
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 6,
          }}
        >
          Resolvers
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default AnimationLogin;
