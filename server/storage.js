import { users } from "../shared/schema.js";

/**
 * Storage class for managing users
 */
export class MemStorage {
	constructor() {
		this.users = new Map();
		this.currentId = 1;
	}

	/**
	 * Get user by ID
	 * @param {number} id - User ID
	 * @returns {Promise<Object|undefined>} User object or undefined
	 */
	async getUser(id) {
		return this.users.get(id);
	}

	/**
	 * Get user by username
	 * @param {string} username - Username
	 * @returns {Promise<Object|undefined>} User object or undefined
	 */
	async getUserByUsername(username) {
		return Array.from(this.users.values()).find(
			(user) => user.username === username
		);
	}

	/**
	 * Create a new user
	 * @param {Object} insertUser - User data
	 * @returns {Promise<Object>} Created user
	 */
	async createUser(insertUser) {
		const id = this.currentId++;
		const user = { ...insertUser, id };
		this.users.set(id, user);
		return user;
	}
}

export const storage = new MemStorage();
