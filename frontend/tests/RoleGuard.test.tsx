import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RoleGuard } from '../src/auth/RoleGuard'
import { useCurrentUser } from '../src/auth/useCurrentUser'

vi.mock('../src/auth/useCurrentUser', () => ({ useCurrentUser: vi.fn() }))
const mockUser = vi.mocked(useCurrentUser)

describe('RoleGuard', () => {
  beforeEach(() => vi.clearAllMocks())
  it('renders admin-only content for Studio.Admin', () => {
    mockUser.mockReturnValue({ oid: 'admin', email: 'admin@example.test', name: 'Admin', department: '', roles: ['Studio.Admin'] })
    render(<MemoryRouter><RoleGuard><div>Area amministrativa</div></RoleGuard></MemoryRouter>)
    expect(screen.getByText('Area amministrativa')).toBeInTheDocument()
  })
  it('redirects Studio.Creator away from admin-only content', () => {
    mockUser.mockReturnValue({ oid: 'creator', email: 'creator@example.test', name: 'Creator', department: '', roles: ['Studio.Creator'] })
    render(<MemoryRouter><RoleGuard><div>Area amministrativa</div></RoleGuard></MemoryRouter>)
    expect(screen.queryByText('Area amministrativa')).not.toBeInTheDocument()
  })
})
