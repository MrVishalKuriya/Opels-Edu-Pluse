const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `HTTP Error ${response.status}: ${response.statusText}` };
    }
    throw errorData;
  }
  if (response.status === 204) {
    return null;
  }
  return await response.json();
}

export const studentApi = {
  async getAllStudents() {
    const res = await fetch(`${API_BASE_URL}/students`);
    return handleResponse(res);
  },

  async getStats() {
    const res = await fetch(`${API_BASE_URL}/students/stats`);
    return handleResponse(res);
  },

  async searchStudents(name) {
    const res = await fetch(`${API_BASE_URL}/students/search?name=${encodeURIComponent(name)}`);
    return handleResponse(res);
  },

  async createStudent(studentData) {
    const res = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  async updateStudent(id, studentData) {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  async deleteStudent(id) {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  }
};

export const facultyApi = {
  async getAllFaculty() {
    const res = await fetch(`${API_BASE_URL}/faculty`);
    return handleResponse(res);
  },

  async createFaculty(facultyData) {
    const res = await fetch(`${API_BASE_URL}/faculty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(facultyData),
    });
    return handleResponse(res);
  },

  async deleteFaculty(id) {
    const res = await fetch(`${API_BASE_URL}/faculty/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  }
};

export const noticeApi = {
  async getAllNotices() {
    const res = await fetch(`${API_BASE_URL}/notices`);
    return handleResponse(res);
  },

  async createNotice(noticeData) {
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticeData),
    });
    return handleResponse(res);
  },

  async deleteNotice(id) {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  }
};
