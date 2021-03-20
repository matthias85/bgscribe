import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import shortid from 'shortid'
import { OptionTypeBase } from 'react-select'

import * as types from 'types'

import { addAchievement } from 'Redux/sideEffects'

import ModalBodyWrapper from 'components/__styled__/ModalBodyWrapper'
import Form from 'components/__styled__/Form'
import AchievementPreview from 'components/__styled__/AchievementPreview'
import TypeRadio from './TypeRadio'
import TitleInput from './TitleInput'
import DescriptionTextarea from './DescriptionTextarea'
import LevelSelect from './LevelSelect'
import ImageFileInput from './ImageFileInput'
import AchievementAvatar from 'components/AchievementAvatar'

type Props = {
  modal: types.Modal
  achievementSetId: types.AchievementSetId
}

const Body = ({ modal, achievementSetId }: Props) => {
  const dispatch = useDispatch()

  const options = [
    ...types.ACHIEVEMENT_LEVELS.map((level) => ({
      value: level,
      label: level,
    })),
  ]

  const [type, setType] = useState<types.AchievementType>({
    type: 'regular',
  })
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [level, setLevel] = useState<OptionTypeBase>(options[0])
  const [image, setImage] = useState<string>('')

  const handleTypeChange = (event: any) =>
    setType({
      type: event.target.value,
    })

  const handleTitleChange = (event: any) => setTitle(event.target.value)
  const handleDescriptionChange = (event: any) =>
    setDescription(event.target.value)
  const handleLevelChange = (option: OptionTypeBase) => setLevel(option)
  const handleImageChange = (event: any) => {
    const reader = new FileReader()

    reader.onload = async (event: any) => {
      setImage(event.target.result)
    }

    reader.readAsDataURL(event.target.files[0])
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const achievementId = shortid.generate()

    dispatch(
      addAchievement({
        achievementSetId,
        achievement: {
          id: achievementId,
          type,
          title,
          description,
          achievementSetId,
          level: level.value,
          image,
        },
      })
    )

    modal.hide()
  }

  return (
    <ModalBodyWrapper>
      <Form id="addAchievement" onSubmit={handleSubmit}>
        <TypeRadio onChange={handleTypeChange} value={type} />
        <TitleInput onChange={handleTitleChange} value={title} />
        <DescriptionTextarea
          onChange={handleDescriptionChange}
          value={description}
        />
        <LevelSelect
          options={options}
          onChange={handleLevelChange}
          value={level}
        />
        <ImageFileInput onChange={handleImageChange} />
      </Form>
      <AchievementPreview>
        <AchievementAvatar src={image} alt="Preview" level={level.value} />
      </AchievementPreview>
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)
