import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import RadarChart from './RadarChart';
// import BarChart from './BarChart';
import gudong from './assets/gudong';
import communicate from './communicate';
import YMap from './Map';

function App() {
  const [ku, setKu] = useState('')
  const [dong, setDong] = useState('')
  const [kuku, setKuku] = useState('')
  const [totong, setTotong] = useState('')

  const [keyword, setKeyword] = useState({교통:20, 편의시설:20, 교육:20, 소음:20, 자연:20})
  const [summary, setSummary] = useState({summary:''})

  const callApi = async() => {
    communicate.post('/info', {id: dong}).then((res) => {
      console.log(res.data)
      if (res.data[0] === null){
        setKeyword({교통:20, 편의시설:20, 교육:20, 소음:20, 자연:20});
        console.log(res.data[1])
        if (res.data[1] === null){
          setSummary({summary:'요약 데이터가 없습니다.'})
        } else {
          setSummary(res.data[1]);  
        }
      } else {
        setKeyword(res.data[0]);
        if (res.data[1]===null){
          setSummary({summary:'요약 데이터가 없습니다.'})
        } else {
          setSummary(res.data[1]);
        }
      }
    });
  };

  useEffect(() => {
    callApi();
  }, [dong])
  function error() {
    alert("데이터가 없는 지역입니다!");
    setKu('서대문구');
    setDong('연희동');
  }

  return (
    <div className={styles.App}>
      <div className={styles.head}>
        <span className={styles.title}>
          이 동네 어때?
        </span>
        <span className={styles.subTitle}>
          2022 YBIGTA Winter Conference
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.dashBoard}>
          <div className={styles.selectBar}>
            <button
              onClick={e => {
                setKu('')
                setDong('')
              }}
            > 초기화 </button>
            <select
              className={styles.gu}
              onChange={(e) => {setKu(e.target.value)}}
            >
              <option selected={ku==='' && "selected"} value=''>
                ---- 구 ----
              </option>
              {Object.keys(gudong).map((gu) => {
                return(
                  <option key={gu} value={gu}
                    selected={ku===gu && "selected"}
                  >
                    {gu}
                  </option>
                )
              })}
            </select>
            {ku === '' ? (
              <select name='d' className={styles.dong}>
                <option value=''>
                  ---- 동 ----
                </option>
                <option value=''>
                  구를 선택해주세요
                </option>
              </select>
            ):(
              <select name='d' className={styles.dong}
                onChange={(e) => setDong(e.target.value)}
              >
                <option value=''>
                  ---- 동 ----
                </option>
                {
                  ( ku ? (
                  gudong[ku].map((tong) => {
                    return(
                      <option key={tong} value={tong}
                        selected={dong===tong && "selected"}
                      >
                        {tong}
                      </option>
                    )
                  })) : (
                    error()
                  ))
                }
              </select>
            )}
          </div>
          <div className={styles.dashContainer}>
            <div style={{paddingBottom:'1rem'}} className={styles.mapArea}>  
              <div className={styles.mapHead}>
                <p className={styles.mapTitle}>
                  📜 Map</p>
                <p className={styles.mapContent}>
                  {kuku} {totong}
                </p>
              </div>
              <YMap methods={{ku, setKu, dong, setDong, setKuku, setTotong}} />
            </div>

            <hr />
            
            <div className={styles.analytics}>
              <div className={styles.charts}>
                <div className={styles.chartArea}>
                  <div className={styles.radarChart}>
                    <div className={styles.chartTitle}>
                    📜 Charts</div>
                    <RadarChart keyword={(keyword && keyword)}/>
                  </div>
                  <div className={styles.barChart}>
                    <div className={styles.summary}>
                      <div className={styles.summaryTitle}>
                        📜 Summary</div>
                      <div className={styles.summaryContent}>
                        {(summary && summary.summary)}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App