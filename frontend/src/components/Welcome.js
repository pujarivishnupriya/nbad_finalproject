import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ArrowRight, Sun } from 'lucide-react'
import { useHistory } from 'react-router-dom'
import './css/Welcome.css'

export default function Welcome() {
  const solarSystemRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const history = useHistory()

  useEffect(() => {
    if (!solarSystemRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(300, 300)
    solarSystemRef.current.appendChild(renderer.domElement)

    const sunGeometry = new THREE.SphereGeometry(1, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sun)

    const earthGeometry = new THREE.SphereGeometry(0.3, 32, 32)
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earth.position.set(2, 0, 0)
    scene.add(earth)

    camera.position.z = 5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false

    const animate = () => {
      requestAnimationFrame(animate)
      sun.rotation.y += 0.005
      earth.rotation.y += 0.01
      earth.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.01)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (solarSystemRef.current) {
        solarSystemRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateCursorPosition)
    return () => window.removeEventListener('mousemove', updateCursorPosition)
  }, [])

  const handleExplore = () => {
    history.push('/login')
  }

  return (
    <div className="container min-h-screen bg-gradient-to-br from-green-800 to-blue-900 text-white p-8 relative overflow-hidden">
      <div
        className="custom-cursor w-5 h-5 border-2 border-yellow-400 rounded-full fixed pointer-events-none z-50 transition-transform duration-100"
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      <header className="mb-16">
        <div className="flex items-center justify-center gap-4">
          <Sun className="w-12 h-12 text-yellow-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold relative overflow-hidden">
              CLEAN ENERGY
              <span className="absolute inset-0 animate-glitch-1"></span>
              <span className="absolute inset-0 animate-glitch-2"></span>
            </span>
            <span className="text-lg text-green-400 tracking-wider">INNOVATIONS</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="flex flex-col gap-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-12 relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-400/20">
            <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-400 animate-sparkle"></div>
            <h1 className="text-4xl font-bold text-center text-green-400 mb-6">Powering a Sustainable Future</h1>
            <p className="text-center text-lg leading-relaxed">
              Embark on a journey through cutting-edge clean energy solutions. This project, developed
              and deployed by <span className="text-yellow-400 font-semibold">VISHNU PRIYA</span>, showcases the latest innovations
              that are reshaping our approach to sustainable power.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-12 flex justify-between items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-400/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4">Explore Renewable Technologies</h2>
              <p className="mb-8 text-lg">
                Dive into a world where clean energy powers endless possibilities.
              </p>
              <button
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-transform duration-300 hover:translate-x-2 hover:shadow-md hover:shadow-green-400/50"
                onClick={handleExplore}
              >
                Explore
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="w-72 h-72" ref={solarSystemRef}></div>
          </div>
        </section>
      </main>

      <footer className="text-center mt-16 text-sm text-green-300">
        <p>© 2024 VISHNU PRIYA | Powering a Greener Tomorrow</p>
      </footer>
    </div>
  )
}