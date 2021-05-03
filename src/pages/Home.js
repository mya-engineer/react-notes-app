import React, { Fragment, useContext, useEffect } from 'react'
import { Form } from '../components/Form'
import { History } from '../components/History'
// import { Loader } from '../components/Loader'
import { Notes } from '../components/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { Header4Animation } from '../animations/Header4Animation'
import { Header4AnimationRotation } from '../animations/Header4AnimationRotation'
import Skeleton from 'react-skeleton-loader'

export const Home = () => {
  const { loading, notes, history, fetchData, removeNote } = useContext(
    FirebaseContext
  )

  const skeletonStyle = {
    count: 4,
    width: '100%',
    height: '40px',
    widthRandomness: 0,
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Fragment>
      <Form />
      <hr />
      {loading ? (
        <div>
          <h4>
            <Skeleton height={'30px'} />
          </h4>
          <div>
            <Skeleton {...skeletonStyle} />
          </div>
          <hr />
          <h4>
            <Skeleton height={'30px'} width={'20%'} />
          </h4>
          <div>
            <Skeleton {...skeletonStyle} count={3} />
          </div>
        </div>
      ) : (
        // <Loader />
        <div>
          <Header4Animation text={'Notes'} />
          <Notes notes={notes} onRemove={removeNote} />
          <hr />
          <Header4AnimationRotation text={'Historical Notes'} />
          <History history={history} />
        </div>
      )}
    </Fragment>
  )
}
