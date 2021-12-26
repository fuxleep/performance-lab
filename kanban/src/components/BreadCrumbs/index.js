import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { routes } from '../../data/routes'
import {
  BreadCrumbsContainer,
  BreadCrumbsItem,
  BreadCrumbsLink,
} from './styles'

export const BreadCrumbs = () => {
  const { pathname } = useLocation()
  const { projectId, issueId } = useParams()
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const projectTitle = useSelector(
    (state) => state.projects.value[projectId]?.title
  )
  const issueTitle = useSelector(
    (state) =>
      state.projects.value[projectId]?.issueBoards
        ?.flatMap((board) => board)
        ?.find((issue) => issue.id === issueId)?.title
  )

  useEffect(() => {
    const route = routes.find(
      (route) =>
        route.path ===
        pathname.replace(projectId, ':projectId').replace(issueId, ':issueId')
    )
    if (!route) return
    setBreadCrumbs(
      route.pathway ??
        pathname
          .slice(1)
          .split('/')
          .map((_, idx, array) => '/' + array.slice(0, idx + 1).join('/'))
    )
  }, [pathname])

  return (
    <BreadCrumbsContainer>
      {breadCrumbs.map((route, index) => {
        let label = route.split('/').pop()
        if (label === projectId) label = projectTitle || "Project Doesn't Exist"
        else if (label === issueId) label = issueTitle || "Issue Doesn't Exist"
        else
          label = label
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' ')

        return (
          <BreadCrumbsItem key={route}>
            <BreadCrumbsLink
              to={route}
              {...(index === breadCrumbs.length - 1
                ? { active: 'active' }
                : {})}
            >
              {label}
            </BreadCrumbsLink>
          </BreadCrumbsItem>
        )
      })}
    </BreadCrumbsContainer>
  )
}
