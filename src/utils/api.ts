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
  startBalance?: number
  imageId: string
  parentId: number
  balance?: number | string
}

export const getHistory = async (childId?: string) => {
  const response = await fetch(
    `${API_URL}/getChildHistory?childId=${childId}`,
    {
      method: 'GET',
      headers: {
        accept: 'text/plain',
      },
    }
  )
  const data = await response.text()
  const res = JSON.parse(data)
  return res
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

export const getChildren = async (parentId: string) => {
  const response = await fetch(`${API_URL}/getChildren?parentId=${parentId}`, {
    method: 'GET',
    headers: {
      accept: 'text/plain',
    },
  })
  const data = await response.text()
  const res = JSON.parse(data)
  return res
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
    console.log('error', error)
  }
}

export const handleDepositOrWithdraw = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/depositWithdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getBalance = async (childId: string) => {
  const response = await fetch(`${API_URL}/getBalance?childId=${childId}`, {
    method: 'GET',
    headers: {
      accept: 'text/plain',
    },
  })
  const data = await response.text()
  const res = JSON.parse(data)
  return res
}

export const deleteChild = async (childId: string) => {
  try {
    const response = await fetch(`${API_URL}/deleteChild?childId=${childId}`, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
      },
    })

    return response
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
