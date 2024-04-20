""" reconstructed db relationships

Revision ID: 9c5ca8341f6c
Revises: c42ee2fef454
Create Date: 2024-04-19 23:31:51.540626

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c5ca8341f6c'
down_revision = 'c42ee2fef454'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_budgets')
    with op.batch_alter_table('budgets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_budgets_category_id_categories'), 'categories', ['category_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_budgets_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.drop_constraint('fk_categories_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_categories_budget_id_budgets', type_='foreignkey')
        batch_op.drop_column('user_id')
        batch_op.drop_column('budget_id')

    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('budget_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_transactions_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_transactions_budget_id_budgets'), 'budgets', ['budget_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=False))
        batch_op.drop_constraint(batch_op.f('fk_transactions_budget_id_budgets'), type_='foreignkey')
        batch_op.create_foreign_key('fk_transactions_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.drop_column('budget_id')

    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('budget_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key('fk_categories_budget_id_budgets', 'budgets', ['budget_id'], ['id'])
        batch_op.create_foreign_key('fk_categories_user_id_users', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('budgets', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_budgets_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_budgets_category_id_categories'), type_='foreignkey')
        batch_op.drop_column('category_id')
        batch_op.drop_column('user_id')

    op.create_table('_alembic_tmp_budgets',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('percentage', sa.FLOAT(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('category_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name='fk_budgets_category_id_categories'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_budgets_user_id_users'),
    sa.PrimaryKeyConstraint('id', name='pk_budgets')
    )
    # ### end Alembic commands ###
