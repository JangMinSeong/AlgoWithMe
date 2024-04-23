import type { Meta, StoryObj } from '@storybook/react'
import LandingHeader from '@/components/Header/LandingHeader'

const meta = {
  title: 'Header/Nav',
  component: LandingHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LandingHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Nav: Story = {}
