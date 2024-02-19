/* eslint-disable linebreak-style */
const router = require('express').Router();
const { Book, Rental, User, Author } = require('../../db/models');

// --------------------------------------------------------------------------
async function findRentalsForUser(userId) {
  try {
    const rentals = await Rental.findAll({
      where: {
        user_id: userId,
        date_end: null,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstname', 'lastname'],
        },
        {
          model: Book,
          attributes: ['id', 'isbn', 'title'],
          include: [
            {
              model: Author,
              attributes: ['firstname', 'lastname'],
            },
          ],
        },
      ],
    });

    // const channels = await Rental.findAll({ where: { user_id: userId } });
    return rentals;
  } catch (error) {
    console.error('No rentals for user', error);
    throw error;
  }
}

// --------------------------------------------------------------------------
async function findAllAvailableBooks() {
  try {
    const books = await Book.findAll({
      where: {
        isdeleted: false,
        isrented: false,
      },
    });
    return books;
  } catch (error) {
    console.error('No books for rentals', error);
    throw error;
  }
}

// --------------------------------------------------------------------------
router.route('/users')
  .get(async (req, res) => {
    try {
      const allUsers = await User.findAll({ raw: true });
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/users/:id')
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const [updatedCount, updatedUsers] = await User.update(req.body, {
        where: { id },
        returning: true,
      });

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(201).json(updatedUsers[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await User.destroy({ where: { id } });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/rental')
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const [updatedCount, updatedUsers] = await User.update(req.body, {
        where: { id },
        returning: true,
      });

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(201).json(updatedUsers[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      // rental_id - идентификатор аренды (Rental) которую нужно "удалить"
      // точнее прописать дату Rentals.date_end в карточке аренды книги
      // book_id - идентификатор книги (Book) которую нужно изменить
      // точнее поставить отметку в поле Books.isrented = false
      // эти данные получаем в теле запроса
      const { idRental, idBook } = req.body;
      console.log('idRental, idBook: ', idRental, idBook);

      // Получить текущую дату и время
      const currentDate = new Date();

      // Предположим, что вы хотите обновить поле book_id и date_end в таблице Rental
      const rentalUpdate = await Rental.update(
        {
          date_end: currentDate,
        },
        { where: { id: idRental } },
      );

      if (rentalUpdate[0] === 0) {
        return res.status(404).json({ error: 'Rental not found' });
      }
      // В rentalUpdate[1] будут возвращены обновленные записи, если нужно
      const updatedRental = rentalUpdate[1];

      // Предположим, что вы хотите обновить поле book_id и date_end в таблице Rental
      const booklUpdate = await Book.update(
        {
          isrented: false,
        },
        { where: { id: idBook } },
      );

      if (booklUpdate[0] === 0) {
        return res.status(404).json({ error: 'Rental not found' });
      }
      // В rentalUpdate[1] будут возвращены обновленные записи, если нужно
      const updatedBook = booklUpdate[1];


      // Вернуть успешный ответ или обновленные данные
      // !!! res.status(200).json({ success: true, updatedRental });

      res.json({ idRental, idBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      // rental_id - идентификатор аренды (Rental) которую нужно "удалить"
      // точнее прописать дату Rentals.date_end в карточке аренды книги
      // book_id - идентификатор книги (Book) которую нужно изменить
      // точнее поставить отметку в поле Books.isrented = false
      // эти данные получаем в теле запроса
      const { idUser, idBook } = req.body;
      console.log('idUser, idBook: ', idUser, idBook);

      // Получить текущую дату и время
      const currentDate = new Date();

      const newRental = await Rental.create({
        date_begin: currentDate,
        book_id: idBook,
        user_id: idUser,
      });

      if (!newRental) {
        return res.status(404).json({ error: 'Rental not added' });
      }

      // Предположим, что вы хотите обновить поле book_id и date_end в таблице Rental
      const booklUpdate = await Book.update(
        {
          isrented: true,
        },
        { where: { id: idBook } },
      );

      if (!booklUpdate) {
        return res.status(404).json({ error: 'Rental not found' });
      }
      // В rentalUpdate[1] будут возвращены обновленные записи, если нужно
      const updatedBook = booklUpdate[1];

      // Вернуть успешный ответ или обновленные данные
      // !!! res.status(200).json({ success: true, updatedRental });

      res.json({ idUser, idBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/books')
  .post(async (req, res) => {
    // получение значений из тела запроса
    const { idcard } = req.body;

    // поиск в БД по ID Card и получение объекта пользователя
    const dbRes = await findAllAvailableBooks();
    dbRes.search = true;
    res.json(dbRes);
  })
  .put(async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// '/api/user'
router.route('/user')
  .post(async (req, res) => {
    // получение значений из тела запроса
    const { idcard } = req.body;

    // поиск в БД по ID Card и получение объекта пользователя
    const user = await User.findOne({ where: { idcard } });

    if (user) {
      const userData = user.get();
      // Отправка данных в ответе
      // console.log('********************************userData: ', userData);
      res.json(userData.id);
    } else {
      // JSON ответ с сообщением в случае некорректного ввода или отсутствия пользователя в БД
      res.status(403).json({ search: false, message: 'This ID Card is not used in the system' });
    }
  });

module.exports = router;
