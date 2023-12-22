const API_URL = 'https://allowanceapp.azurewebsites.net/api'

type SignUpType = {
  phone: string
  fName?: string
  lName?: string
}

type ChildType = {
  fName: string
  lName: string
  bDay?: Date
  allowanceAmount: number
  isWeekly: boolean
  startBalance: number
  imageId: string
  parentId: number
}

export const getHistory = async (id?: string) => {
  const response = await fetch(`${API_URL}/history/${id}`)
  const data = await response.json()
  return data
}

export const getHistoryDetails = async (id: string) => {
  const response = await fetch(`${API_URL}/history/${id}`)
  const data = await response.json()
  return data
}

export const signUpLogin = async (data: SignUpType) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  return result
}

export const addEditChild = async (data: ChildType) => {
  try {
    const response = await fetch(`${API_URL}/addEditChild`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  } catch (error) {
    debugger
    console.log('error', error)
  }
}
