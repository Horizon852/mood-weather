import { useEffect, useState } from 'react'
import { QUESTIONS } from './data/content.js'
import Intro from './components/Intro.jsx'
import Question from './components/Question.jsx'
import Result from './components/Result.jsx'
import Footer from './components/Footer.jsx'

const RESULT_STEP = QUESTIONS.length + 1 // step 0 = เลือกอากาศ · 1-4 = คำถาม · 5 = ผลลัพธ์

export default function App() {
  const [step, setStep] = useState(0)
  const [weather, setWeather] = useState(null)
  const [answers, setAnswers] = useState([])

  // พื้นหลังหน้าผลลัพธ์เปลี่ยนตามสภาพอากาศ (กฎอยู่ใน index.css)
  useEffect(() => {
    if (step === RESULT_STEP) document.body.dataset.weather = weather
    else delete document.body.dataset.weather
  }, [step, weather])

  const pickWeather = (key) => { setWeather(key); setStep(1) }
  const answer = (option) => { setAnswers((a) => [...a, option]); setStep((s) => s + 1) }
  const back = () => (step === 1 ? restart() : (setAnswers((a) => a.slice(0, -1)), setStep((s) => s - 1)))
  const restart = () => { setStep(0); setWeather(null); setAnswers([]) }

  return (
    <main className="mx-auto flex min-h-screen max-w-[440px] flex-col px-5 pt-5 pb-8">
      {step === 0 && <><Intro onPick={pickWeather} /><Footer /></>}
      {step >= 1 && step < RESULT_STEP && <><Question key={step} step={step} onAnswer={answer} onBack={back} /><Footer /></>}
      {step === RESULT_STEP && <Result weather={weather} answers={answers} onRestart={restart} />}
    </main>
  )
}
