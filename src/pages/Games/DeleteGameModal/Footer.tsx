import React from 'react'
import { useDispatch } from 'react-redux'

import * as types from 'types'

import { deleteGame } from 'Redux/Games/sideEffects'
import { deleteAllGameSessions } from 'Redux/Sessions/sideEffects'

import Button from 'components/__styled__/Button'

type Props = {
  modal: types.Modal
  game: types.Game
}

const Footer = ({ modal, game }: Props) => {
  const dispatch = useDispatch()

  const handleDeleteGame = () => {
    dispatch(deleteAllGameSessions(game.id))
    dispatch(deleteGame(game.id))
    modal.hide()
  }

  const handleCancel = () => {
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel} variant="secondary" size="small">
        Cancel
      </Button>
      <Button onClick={handleDeleteGame} size="small">
        Delete game
      </Button>
    </>
  )
}

export default React.memo(Footer)